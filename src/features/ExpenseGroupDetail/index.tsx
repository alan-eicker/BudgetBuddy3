import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from 'react-query';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ContentSection from '@/components/ContentSection';
import Card from '@/components/Card';
import SpendingSnapshot from '@/components/SpendingSnapshot';
import { queryClient, getExpenseGroupById, deleteExpenseGroup } from '@/api';
import {
  GetExpenseGroupByIdQuery,
  Expense,
  DeleteExpenseGroupQuery,
} from '@/graphql/generated/graphql';
import { useOverlayContext } from '@/providers/OverlayProvider';
import {
  formatNumber,
  getTotalBalanceOfAllExpenses,
  getTotalUnpaidExpenses,
  isOverDue,
} from '@/utils/numbers';
import styles from './ExpenseGroupDetail.module.scss';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const _id = context.query.expenseGroupId as string;
  await queryClient.prefetchQuery<GetExpenseGroupByIdQuery>(
    ['expenseGroup' + _id],
    () => getExpenseGroupById({ _id }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ExpenseGroupDetail = (): JSX.Element => {
  const router = useRouter();
  const {
    query: { expenseGroupId },
  } = router;
  const { setShowOverlay } = useOverlayContext();

  const { data } = useQuery<GetExpenseGroupByIdQuery>(
    ['expenseGroup' + expenseGroupId],
    () => getExpenseGroupById({ _id: expenseGroupId as string }),
  );

  const handleDelete = async () => {
    const { status } = await queryClient.fetchQuery<DeleteExpenseGroupQuery>(
      ['deleteExpenseGroup' + expenseGroupId],
      () => deleteExpenseGroup({ _id: expenseGroupId as string }),
    );

    if (status.code === 200) {
      queryClient.removeQueries('expenseGroups');
      router.push('/account/dashboard');
    }
  };

  const mapOverdueStatustoExpenses = (expenses: Expense[]) => {
    return expenses.map((expense: Expense) => ({
      ...expense,
      isOverdue: isOverDue(expense),
    }));
  };

  useEffect(() => {
    setShowOverlay(!data);
  }, [data, setShowOverlay]);

  if (!data) return <ContentSection>No data</ContentSection>;

  let totalBalance = 0;
  let unpaidExpenses = 0;
  let getLeftOverBalance = 0;

  const { startDate, endDate, totalBudget, expenses } = data.expenseGroup;

  if (expenses) {
    totalBalance = getTotalBalanceOfAllExpenses(expenses, 'balance');
    unpaidExpenses = getTotalUnpaidExpenses(expenses, 'balance');
    getLeftOverBalance = totalBudget - totalBalance;
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.head}>
        <ContentSection>
          <Grid container spacing={2}>
            <Grid className={styles.headLeft} item xs={12} sm={6} md={6}>
              <Button href="/account/dashboard" size="small">
                &laquo; Back to dashboard
              </Button>
              <Typography component="h1" variant="h4">
                {`${startDate} - ${endDate}`}
              </Typography>
              <Typography component="h2" variant="h6">
                Total Budget: ${formatNumber(totalBudget)}
              </Typography>
            </Grid>
            <Grid
              className={styles.headRight}
              alignItems="center"
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Button
                className="text-center"
                variant="contained"
                size="small"
                onClick={() => {}}
              >
                Edit Group
              </Button>
              <Button
                className="text-center"
                variant="contained"
                size="small"
                onClick={() => {}}
              >
                Duplicate Group
              </Button>
              <Button
                className="text-center"
                color="error"
                variant="contained"
                size="small"
                onClick={() => handleDelete()}
              >
                Delete Group
              </Button>
            </Grid>
          </Grid>
        </ContentSection>
        <Box style={{ backgroundColor: '#212a3b' }}>
          <ContentSection compressed>
            <Button>+ Add Expense</Button>
          </ContentSection>
        </Box>
      </Box>
      <Box className={styles.body}>
        <ContentSection noPaddingTop>
          {!expenses && (
            <>
              <Typography>No expense data to display.</Typography>
              <Button sx={{ marginTop: 2 }} size="small" variant="contained">
                + Add Expense
              </Button>
            </>
          )}
          {expenses && (
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={8}>
                <List disablePadding dense>
                  {mapOverdueStatustoExpenses(expenses).map((expense) => (
                    <ListItem disablePadding key={expense._id}>
                      <Card
                        hasError={expense.isOverdue}
                        head={
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box display="flex" alignItems="center">
                              <Typography
                                component="h3"
                                fontSize={20}
                                marginRight={1.5}
                              >
                                {expense.name}
                              </Typography>
                              {expense.isOverdue && (
                                <>
                                  <ErrorOutlineIcon color="error" />
                                  <Typography
                                    component="span"
                                    marginLeft={0.5}
                                    color="#f44336"
                                    fontSize={12}
                                  >
                                    Overdue
                                  </Typography>
                                </>
                              )}
                            </Box>
                            <Box>
                              <Button>Edit</Button>
                              <Button>Delete</Button>
                            </Box>
                          </Box>
                        }
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Box>Balance: ${formatNumber(expense.balance)}</Box>
                            <Box>Due Date: {expense.dueDate}</Box>
                          </Box>
                          <Box>
                            Paid
                            <Switch checked={expense.isPaid} />
                          </Box>
                        </Box>
                        {expense.note && (
                          <Box display="flex" alignItems="center" marginTop={1}>
                            <ErrorOutlineOutlinedIcon
                              color="info"
                              fontSize="small"
                              sx={{ marginRight: 0.5 }}
                            />
                            <Typography component="span" fontSize={12}>
                              {expense.note}
                            </Typography>
                          </Box>
                        )}
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box className={styles.spendingSnapshotFixedContainer}>
                  <SpendingSnapshot
                    items={[
                      ['Total Balance', formatNumber(totalBalance)],
                      ['Unpaid Balance', formatNumber(unpaidExpenses)],
                      ['Left Over Balance', formatNumber(getLeftOverBalance)],
                    ]}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </ContentSection>
      </Box>
    </Box>
  );
};

export default ExpenseGroupDetail;

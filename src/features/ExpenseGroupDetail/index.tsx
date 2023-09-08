import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from 'react-query';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ContentSection from '@/components/ContentSection';
import SpendingSnapshot from '@/components/SpendingSnapshot';
import ExpenseCard from '@/components/ExpenseCard';
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
                <List style={{ marginTop: 1 }} disablePadding dense>
                  {mapOverdueStatustoExpenses(expenses).map((expense) => (
                    <ListItem disablePadding key={expense._id}>
                      <ExpenseCard
                        {...expense}
                        actions={[
                          <Button key="edit-button">Edit</Button>,
                          <Button key="delete-button">Delete</Button>,
                        ]}
                      />
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

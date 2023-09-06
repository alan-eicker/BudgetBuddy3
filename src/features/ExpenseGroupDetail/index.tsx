import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from 'react-query';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import ContentSection from '@/components/ContentSection';
import Card from '@/components/Card';
import { queryClient, getExpenseGroupById } from '@/api';
import { GetExpenseGroupByIdQuery } from '@/generated/graphql';
import { useOverlayContext } from '@/providers/OverlayProvider';
import {
  formatNumber,
  getTotalBalanceOfAllExpenses,
  getTotalUnpaidExpenses,
} from '@/utils/numbers';
import styles from './ExpenseGroupDetail.module.scss';
import { useEffect } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.expenseGroupId as string;
  await queryClient.prefetchQuery<GetExpenseGroupByIdQuery>(
    ['expenseGroup' + id],
    () => getExpenseGroupById({ id }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ExpenseGroupDetail = (): JSX.Element => {
  const { query } = useRouter();
  const { setShowOverlay } = useOverlayContext();

  const { data } = useQuery<GetExpenseGroupByIdQuery>(
    ['expenseGroup' + query.expenseGroupId],
    () => getExpenseGroupById({ id: query.expenseGroupId as string }),
  );

  useEffect(() => {
    setShowOverlay(!data);
  }, [data, setShowOverlay]);

  if (!data) return <ContentSection>No data</ContentSection>;

  let totalBalance = 0;
  let unpaidExpenses = 0;
  let getLeftOverBalance = 0;

  const { name, totalBudget, expenses } = data.expenseGroup;

  if (expenses) {
    totalBalance = getTotalBalanceOfAllExpenses(expenses, 'balance');
    unpaidExpenses = getTotalUnpaidExpenses(expenses, 'balance');
    getLeftOverBalance = totalBudget - totalBalance;
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <ContentSection>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} className={styles.headLeft}>
              <Button href="/account/dashboard" size="small">
                &laquo; Back to dashboard
              </Button>
              <Typography component="h1" variant="h4">
                {name}
              </Typography>
              <Typography component="h2" variant="h6">
                Total Budget: ${formatNumber(totalBudget)}
              </Typography>
            </Grid>
            <Grid
              alignItems="center"
              item
              xs={12}
              sm={6}
              md={6}
              className={styles.headRight}
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
                onClick={() => {}}
              >
                Delete Group
              </Button>
            </Grid>
          </Grid>
        </ContentSection>
        <div style={{ backgroundColor: '#212a3b' }}>
          <ContentSection compressed>
            <Button>+ Add Expense</Button>
          </ContentSection>
        </div>
      </div>
      <div className={styles.body}>
        <ContentSection noPaddingTop>
          {!expenses && (
            <>
              <p>No expense data to display.</p>
              <Button sx={{ marginTop: 2 }} size="small" variant="contained">
                + Add Expense
              </Button>
            </>
          )}
          {expenses && (
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={8}>
                <ul>
                  {expenses.map((expense) => (
                    <li key={expense.id}>
                      <Card
                        head={
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <div>{expense.name}</div>
                            <div>
                              <Button>Edit</Button>
                              <Button>Delete</Button>
                            </div>
                          </Box>
                        }
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <div>
                            <div>Balance: ${formatNumber(expense.balance)}</div>
                            <div>Due Date: {expense.dueDate}</div>
                          </div>
                          <div>
                            Paid
                            <Switch checked={expense.isPaid} />
                          </div>
                        </Box>
                        {expense.note && (
                          <Typography sx={{ marginTop: 1 }} fontSize={12}>
                            {expense.note}
                          </Typography>
                        )}
                      </Card>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Card
                  head={
                    <h3 style={{ textAlign: 'center' }}>Spending Snapshot</h3>
                  }
                >
                  <ul style={{ textAlign: 'center' }}>
                    <li>
                      <Typography component="h4">Total Balance</Typography>
                      <Typography fontSize={26} fontWeight="bold">
                        ${formatNumber(totalBalance)}
                      </Typography>
                    </li>
                    <li>
                      <Typography component="h4">Unpaid Balance</Typography>
                      <Typography fontSize={26} fontWeight="bold">
                        ${formatNumber(unpaidExpenses)}
                      </Typography>
                    </li>
                    <li>
                      <Typography component="h4">Left Over Balance</Typography>
                      <Typography fontSize={26} fontWeight="bold">
                        ${formatNumber(getLeftOverBalance)}
                      </Typography>
                    </li>
                  </ul>
                </Card>
              </Grid>
            </Grid>
          )}
        </ContentSection>
      </div>
    </div>
  );
};

export default ExpenseGroupDetail;

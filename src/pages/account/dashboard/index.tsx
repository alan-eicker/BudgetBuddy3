import Head from 'next/head';
import Link from 'next/link';
import { dehydrate, useQuery } from 'react-query';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Grid from '@mui/material/Grid';
import Jumbotron from '@/components/presentational/Jumbtron';
import LineChart from '@/components/presentational/LineChart';
import Card from '@/components/presentational/Card';
import ContentSection from '@/components/presentational/ContentSection';
import { queryClient, getExpenses } from '../../../api';

interface ExpenseGroupPreview {
  id: string;
  name: string;
  expenses: Expense[];
}

export interface Expense {
  id: string;
  name: string;
  balance: number;
  dueDate: string;
  isPaid: boolean;
}

const chartData = [
  {
    name: 'Jan',
    2022: 4500,
    2023: 3500,
  },
  {
    name: 'Feb',
    2022: 5200,
    2023: 4300,
  },
  {
    name: 'Mar',
    2022: 3320,
    2023: 4700,
  },
  {
    name: 'Apr',
    2022: 4356,
    2023: 7034,
  },
  {
    name: 'May',
    2022: 5670,
    2023: 3290,
  },
  {
    name: 'Jun',
    2022: 4300,
    2023: 5230,
  },
  {
    name: 'Jul',
    2022: 2300,
    2023: 3345,
  },
  {
    name: 'Aug',
    2022: 8030,
    2023: 4356,
  },
  {
    name: 'Sep',
    2022: 5467,
    2023: 3456,
  },
  {
    name: 'Oct',
    2022: 7345,
    2023: 5233,
  },
  {
    name: 'Nov',
    2022: 6100,
    2023: 4355,
  },
  {
    name: 'Dec',
    2022: 3567,
    2023: 7100,
  },
];

const getTotalBalance = (expenses: Expense[]): string => {
  const total = expenses.reduce((acc, curr) => {
    return acc + curr.balance;
  }, 0);

  return total.toFixed(2);
};

const getTotalOverdueBalances = (expenses: Expense[]): number => {
  let overdueExpenses = 0;
  const unpaidExpenses = expenses.filter((expense) => !expense.isPaid);

  unpaidExpenses.forEach((unpaidExpense) => {
    if (new Date() > new Date(unpaidExpense.dueDate)) {
      overdueExpenses += 1;
    }
  });

  return overdueExpenses;
};

const expenseGroups: ExpenseGroupPreview[] = [
  {
    id: '1',
    name: '08/01/2023 - 08/15/2023',
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '08/05/2023',
        isPaid: true,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 240.56,
        dueDate: '08/10/2023',
        isPaid: false,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '08/14/2023',
        isPaid: false,
      },
    ],
  },
  {
    id: '2',
    name: '08/15/2023 - 08/31/2023',
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '08/16/2023',
        isPaid: true,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 320.99,
        dueDate: '08/21/2023',
        isPaid: true,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '08/31/2023',
        isPaid: false,
      },
    ],
  },
  {
    id: '3',
    name: '09/01/2023 - 09/15/2023',
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '09/01/2023',
        isPaid: true,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 225.12,
        dueDate: '09/12/2023',
        isPaid: true,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '09/14/2023',
        isPaid: false,
      },
    ],
  },
];

export async function getServerSideProps() {
  await queryClient.prefetchQuery(['expenses'], () => getExpenses());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Dashboard = () => {
  const { data } = useQuery(['expenses'], () => getExpenses());

  return (
    <>
      <Head>
        <title>BudgetBuddy | Dashboard</title>
        <meta name="description" content="BudgetBuddy Dashboard page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Jumbotron>
        <LineChart
          title="12 Month Spending Snapshot"
          titleElement="h2"
          height={250}
          linecolors={['#03B2AF', '#96de49']}
          axisColor="#fff"
          gridColor="rgba(255,255,255,0.15)"
          data={chartData}
        />
      </Jumbotron>
      <ContentSection>
        <Grid container spacing={2}>
          {expenseGroups.map(({ id, name, expenses }) => {
            const numOverdueBalances = getTotalOverdueBalances(expenses);
            return (
              <Grid key={id} item xs={4}>
                <Link href={`/account/dashboard/${id}`}>
                  <Card head={name}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        Total Balance:
                        <br />${getTotalBalance(expenses)}
                      </div>
                      {numOverdueBalances > 0 && (
                        <div style={{ textAlign: 'center' }}>
                          <ErrorOutlineIcon color="error" fontSize="large" />
                          <div
                            style={{
                              fontSize: 11,
                              color: '#f44336',
                              marginTop: -5,
                            }}
                          >
                            {numOverdueBalances} overdue expenses
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </ContentSection>
    </>
  );
};

export default Dashboard;

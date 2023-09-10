import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Jumbotron from '@/components/Jumbtron';
import LineChart from '@/components/LineChart';
import Card from '@/components/Card';
import ContentSection from '@/components/ContentSection';
import NoData from '@/components/NoData';
import { getAllExpenseGroups } from '@/api';
import { GetAllExpenseGroupsQuery } from '@/graphql/generated/graphql';
import { getTotalBalance, getTotalOverdueBalances } from '@/utils/expenses';
import { usePageDataStateHandler } from '@/shared/hooks/usePageDataStateHandler';

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

const Dashboard = (): JSX.Element => {
  const router = useRouter();

  const { data } = useQuery<GetAllExpenseGroupsQuery>(['expenseGroups'], () =>
    getAllExpenseGroups(),
  );

  usePageDataStateHandler(data);

  if (data && !data?.expenseGroups.length)
    return (
      <NoData
        text="You have no expense groups to display"
        btn={{
          children: '+ Add Expense Group',
          href: '/account/add-expense-group',
        }}
      />
    );

  return (
    <>
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
        <Box paddingBottom={2}>
          <Button href="/account/add-expense-group">+ Add Expense Group</Button>
        </Box>
        <Grid container spacing={2}>
          {data?.expenseGroups.map(({ _id, startDate, endDate, expenses }) => {
            const numOverdueBalances = !expenses
              ? 0
              : getTotalOverdueBalances(expenses);
            return (
              <Grid key={_id} item xs={12} sm={12} md={4}>
                <Link href={`/account/expense-group/${_id}`}>
                  <Card head={`${startDate} - ${endDate}`} height="100%">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        Total Balance:
                        <br />
                        {expenses ? (
                          '$' + getTotalBalance(expenses)
                        ) : (
                          <Button size="small">Add Expenses</Button>
                        )}
                      </Box>
                      {numOverdueBalances > 0 && (
                        <Box textAlign="center">
                          <ErrorOutlineIcon color="error" fontSize="large" />
                          <Typography
                            fontSize={11}
                            color="#f44336"
                            marginTop={-0.5}
                          >
                            {numOverdueBalances} overdue expenses
                          </Typography>
                        </Box>
                      )}
                    </Box>
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

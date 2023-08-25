import Head from 'next/head';
import { dehydrate, useQuery } from 'react-query';
import Jumbotron from '@/components/presentational/Jumbtron';
import SpendingSnapshot from '@/components/presentational/SpendingSnapshot';
import { queryClient, getExpenses } from '../../../api';

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
        <SpendingSnapshot
          title="12 Month Spending Snapshot"
          titleElement="h2"
          height={250}
          linecolors={['#03B2AF', '#ff5794']}
          axisColor="#fff"
          gridColor="rgba(255,255,255,0.15)"
          data={chartData}
        />
      </Jumbotron>
    </>
  );
};

export default Dashboard;

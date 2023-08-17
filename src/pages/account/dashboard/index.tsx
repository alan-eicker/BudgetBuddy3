import Head from 'next/head';
import { dehydrate, useQuery } from 'react-query';
import { queryClient, getExpenses } from '../../../api';
import Jumbotron from '@/components/Jumbtron';

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
        <div>Spending snapshot</div>
      </Jumbotron>
      <pre>{JSON.stringify(data?.expenses, null, 2)}</pre>
    </>
  );
};

export default Dashboard;

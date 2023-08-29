import Head from 'next/head';
import Dashboard from '@/features/Dashboard';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>BudgetBuddy | Dashboard</title>
        <meta name="description" content="BudgetBuddy dashboard page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Dashboard />
    </>
  );
};

export default DashboardPage;

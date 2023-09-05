import Head from 'next/head';
import LoginForm from '@/features/LoginForm';

const HomePage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>BudgetBuddy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BudgetBuddy login page" />
      </Head>
      <LoginForm />
    </>
  );
};

export default HomePage;

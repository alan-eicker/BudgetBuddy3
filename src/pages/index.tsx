import Head from 'next/head';
import LoginForm from '@/features/LoginForm';

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>BudgetBuddy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BudgetBuddy Home page" />
      </Head>
      <LoginForm />
    </>
  );
};

export default Home;

import Head from 'next/head';
import LoginForm from '@/features/LoginForm';
import ContentSection from '@/components/presentational/ContentSection';

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>BudgetBuddy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BudgetBuddy Home page" />
      </Head>
      <ContentSection maxWidth={500}>
        <LoginForm />
      </ContentSection>
    </>
  );
};

export default Home;

import Head from 'next/head';
import ExpenseGroupDetail from '@/features/ExpenseGroupDetail';

const ExpenseGroupDetailPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>BudgetBuddy | Expense Group Detail</title>
        <meta
          name="description"
          content="BudgetBuddy expense group detail page"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ExpenseGroupDetail />
    </>
  );
};

export default ExpenseGroupDetailPage;

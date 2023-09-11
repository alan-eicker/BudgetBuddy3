import Head from 'next/head';
import ExpenseGroupForm from '@/features/ExpenseGroupForm';

const AddExpenseGroup = () => (
  <>
    <Head>
      <title>BudgetBuddy | Add Expense Group</title>
      <meta name="description" content="BudgetBuddy add expense group page" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ExpenseGroupForm />
  </>
);

export default AddExpenseGroup;

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
import {
  getExpenseGroupById,
  addExpense,
  updateExpense,
  deleteExpenseGroup,
  queryClient,
} from '@/api';
import { ExpenseGroup, Expense } from '@/graphql/generated/graphql';
import { useAppContext } from '@/providers/AppProvider';
import { isOverDue } from '@/utils/expenses';

function useExpenseGroupDetail() {
  const router = useRouter();
  const { setShowOverlay } = useAppContext();
  const [error, setError] = useState<string>();

  const {
    query: { expenseGroupId },
  } = router;

  const { data } = useQuery(['expenseGroup' + expenseGroupId], () =>
    getExpenseGroupById({ _id: expenseGroupId as string }),
  );

  const updateExpenseMutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
    },
    onError: () => {
      setError('Could not update expense');
    },
  });

  const addExpenseMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
    },
    onError: () => {
      setError('Could not add new expense');
    },
  });

  const deleteExpenseGroupMutation = useMutation({
    mutationFn: deleteExpenseGroup,
    onSuccess: () => {
      queryClient.removeQueries('expenseGroups');
      router.push('/account/dashboard');
    },
    onError: () => {
      setError('Could not delete expense group');
    },
  });

  async function handleExpenseGroupDuplicate(formData: ExpenseGroup) {
    console.log(formData);
  }

  async function handleExpenseGroupDelete() {
    setShowOverlay(true);
    deleteExpenseGroupMutation.mutate({ _id: expenseGroupId as string });
  }

  function handleAddExpense(newExpense: Expense) {
    addExpenseMutation.mutate({
      input: { expenseGroupId: expenseGroupId as string, ...newExpense },
    });
  }

  function handleUpdateExpense(updatedExpense: Expense) {
    updateExpenseMutation.mutate({
      input: { expenseGroupId: expenseGroupId as string, ...updatedExpense },
    });
  }

  function handleDeleteExpense(expenseId: string) {
    console.log(expenseId);
  }

  function mapOverdueStatustoExpenses(expenses: Expense[]) {
    return expenses.map((expense) => ({
      ...expense,
      isOverdue: isOverDue(expense),
    }));
  }

  return {
    data,
    error,
    handleExpenseGroupDuplicate,
    handleExpenseGroupDelete,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
    mapOverdueStatustoExpenses,
  };
}

export default useExpenseGroupDetail;

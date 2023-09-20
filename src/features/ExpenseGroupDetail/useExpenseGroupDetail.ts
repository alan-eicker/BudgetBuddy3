import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
import { ExpenseGroup, Expense } from '@/graphql/generated/graphql';
import { useAppContext } from '@/providers/AppProvider';
import { isOverDue } from '@/utils/expenses';
import {
  getExpenseGroupById,
  addExpense,
  updateExpense,
  updateExpensePaidStatus,
  addExpenseGroup,
  deleteExpenseGroup,
  queryClient,
} from '@/api';

export default function useExpenseGroupDetail() {
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
      queryClient.removeQueries('expenseGroups');
    },
    onError: () => {
      setError('Could not update expense paid status');
    },
  });

  const handleUpdateExpensePaidStatusMutation = useMutation({
    mutationFn: updateExpensePaidStatus,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
      queryClient.removeQueries('expenseGroups');
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

  const createExpenseGroup = useMutation({
    mutationFn: addExpenseGroup,
    onSuccess: () => {
      router.push('/account/dashboard');
      queryClient.removeQueries('expenseGroups');
    },
    onError: () => {
      setError('Could not duplicate expense group');
    },
  });

  async function handleExpenseGroupDuplicate(formData: ExpenseGroup) {
    createExpenseGroup.mutate({ input: formData });
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

  function handleUpdateExpensePaidStatus(
    isPaid: boolean,
    expenseGroupId: string,
    expenseId: string,
  ) {
    handleUpdateExpensePaidStatusMutation.mutate({
      isPaid,
      expenseGroupId,
      expenseId,
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
    handleUpdateExpensePaidStatus,
    handleDeleteExpense,
    mapOverdueStatustoExpenses,
  };
}

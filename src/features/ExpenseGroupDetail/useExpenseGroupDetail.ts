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
  updateExpenseGroup,
  updateExpensePaidStatus,
  addExpenseGroup,
  deleteExpenseGroup,
  deleteExpense,
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

  const updateExpenseGroupMutation = useMutation({
    mutationFn: updateExpenseGroup,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
      queryClient.removeQueries('expenseGroups');
    },
    onError: () => {
      setError('Could not update expense group');
    },
  });

  const updateExpensePaidStatusMutation = useMutation({
    mutationFn: updateExpensePaidStatus,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
      queryClient.removeQueries('expenseGroups');
    },
    onError: () => {
      setError('Could not update expense paid status');
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

  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
    },
    onError: () => {
      setError('Could not delete expense');
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

  function handleExpenseGroupDuplicate(formData: ExpenseGroup) {
    createExpenseGroup.mutate({ input: formData });
  }

  function handleExpenseGroupUpdate(formData: Omit<ExpenseGroup, 'expenses'>) {
    updateExpenseGroupMutation.mutate({
      ...formData,
      expenseGroupId: expenseGroupId as string,
    });
  }

  function handleExpenseGroupDelete() {
    setShowOverlay(true);
    deleteExpenseGroupMutation.mutate({
      expenseGroupId: expenseGroupId as string,
    });
  }

  function handleAddExpense(newExpense: Expense) {
    addExpenseMutation.mutate({
      expenseGroupId: expenseGroupId as string,
      ...newExpense,
    });
  }

  function handleUpdateExpense(updatedExpense: Expense) {
    updateExpenseMutation.mutate({
      expenseGroupId: expenseGroupId as string,
      ...updatedExpense,
    });
  }

  function handleUpdateExpensePaidStatus(
    isPaid: boolean,
    expenseGroupId: string,
    expenseId: string,
  ) {
    updateExpensePaidStatusMutation.mutate({
      isPaid,
      expenseGroupId,
      expenseId,
    });
  }

  function handleDeleteExpense(expenseId: string) {
    deleteExpenseMutation.mutate({
      expenseGroupId: expenseGroupId as string,
      expenseId,
    });
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
    handleExpenseGroupUpdate,
    handleExpenseGroupDelete,
    handleAddExpense,
    handleUpdateExpense,
    handleUpdateExpensePaidStatus,
    handleDeleteExpense,
    mapOverdueStatustoExpenses,
  };
}

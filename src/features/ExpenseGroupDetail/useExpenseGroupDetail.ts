import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
import {
  getExpenseGroupById,
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

  const handleExpenseGroupDuplicate = async (
    formData: Omit<ExpenseGroup, '_id'>,
  ) => {
    console.log(formData);
  };

  const handleExpenseGroupDelete = async () => {
    setShowOverlay(true);

    const { status } = await queryClient.fetchQuery(
      ['deleteExpenseGroup' + expenseGroupId],
      () => deleteExpenseGroup({ _id: expenseGroupId as string }),
    );

    if (status.code === 200) {
      queryClient.removeQueries('expenseGroups');
      router.push('/account/dashboard');
    }
  };

  const handleAddExpense = (newExpense: Expense) => {
    console.log(newExpense);
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    updateExpenseMutation.mutate({
      input: { expenseGroupId: expenseGroupId as string, ...updatedExpense },
    });
  };

  const handleDeleteExpense = (expenseId: string) => {
    console.log(expenseId);
  };

  const mapOverdueStatustoExpenses = (expenses: Expense[]) => {
    return expenses.map((expense) => ({
      ...expense,
      isOverdue: isOverDue(expense),
    }));
  };

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

import { useFormik } from 'formik';
import * as yup from 'yup';
import { ExpenseGroup, Expense } from '@/graphql/generated/graphql';

interface UseExpenseGroupInfoFormModal {
  expenseGroup: ExpenseGroup;
  formType: 'Update' | 'Duplicate';
  onSave: Function;
}

export default function useExpenseGroupInfoFormModal({
  expenseGroup,
  formType,
  onSave,
}: UseExpenseGroupInfoFormModal) {
  let expenses: Expense[] = [];
  let initialValues: Omit<ExpenseGroup, 'expenses'>;

  if (expenseGroup) {
    expenses = expenseGroup.expenses;
  }

  if (formType === 'Update') {
    initialValues = {
      startDate: expenseGroup.startDate,
      endDate: expenseGroup.endDate,
      totalBudget: expenseGroup.totalBudget,
    };
  } else {
    initialValues = {
      startDate: '',
      endDate: '',
      totalBudget: 0,
    };
  }

  const validationSchema = yup.object({
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('Start date is required'),
    totalBudget: yup.number().min(1, 'Total budget is required'),
  });

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formData) => {
      onSave({
        ...formData,
        ...(expenses && {
          expenses: expenses.map((expense) => {
            delete expense._id;
            delete expense.dueDate;
            return {
              ...expense,
              isPaid: false,
              note: null,
            };
          }),
        }),
      });
    },
  });

  return { form };
}

import {
  Expense,
  ExpenseGroup,
  AddExpenseGroupMutationVariables,
  UpdateExpenseMutationVariables,
} from '../../generated/graphql';
import ExpenseGroupModel from '@/database/models/expenseGroup';

export async function addExpenseGroup(
  parent: unknown,
  args: AddExpenseGroupMutationVariables,
): Promise<ExpenseGroup> {
  const expenseGroup = new ExpenseGroupModel(args.input);
  await expenseGroup.save();
  return expenseGroup;
}

export async function updateExpense(
  parent: unknown,
  args: UpdateExpenseMutationVariables,
): Promise<Expense> {
  const { expenseGroupId, ...updatedExpense } = args.input;

  const { _id, name, balance, dueDate, isPaid, note } = updatedExpense;

  await ExpenseGroupModel.findOneAndUpdate(
    { _id: expenseGroupId, 'expenses._id': _id },
    {
      $set: {
        'expenses.$.name': name,
        'expenses.$.balance': balance,
        'expenses.$.dueDate': dueDate,
        'expenses.$.isPaid': isPaid,
        'expenses.$.note': note,
      },
    },
  );

  return updatedExpense;
}

import {
  Expense,
  ExpenseGroup,
  AddExpenseGroupMutationVariables,
  UpdateExpenseMutationVariables,
  AddExpenseMutationVariables,
  StatusResponse,
  QueryDeleteExpenseGroupArgs,
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

export async function deleteExpenseGroup(
  _: any,
  args: QueryDeleteExpenseGroupArgs,
): Promise<StatusResponse> {
  try {
    await ExpenseGroupModel.deleteOne({ _id: args._id });
    return { code: 200 };
  } catch {
    return {
      code: 500,
      message: `Could not delete expense group [${args._id}].`,
    };
  }
}

export async function addExpense(
  parent: unknown,
  args: AddExpenseMutationVariables,
) {
  const { expenseGroupId, ...newExpense } = args.input;

  const expenseGroup = await ExpenseGroupModel.findById(expenseGroupId);
  expenseGroup.expenses.push(newExpense);
  expenseGroup.save();

  return args.input;
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

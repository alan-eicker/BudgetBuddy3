import {
  MutationAddExpenseGroupArgs,
  MutationDeleteExpenseGroupArgs,
  MutationDeleteExpenseArgs,
  MutationUpdateExpenseGroupArgs,
  MutationUpdateExpensePaidStatusArgs,
  MutationUpdateExpenseArgs,
  MutationAddExpenseArgs,
} from '../../generated/graphql';
import ExpenseGroupModel from '@/database/models/expenseGroup';

export async function addExpenseGroup(
  parent: unknown,
  args: MutationAddExpenseGroupArgs,
) {
  const expenseGroup = new ExpenseGroupModel(args.input);
  await expenseGroup.save();
}

export async function updateExpenseGroup(
  parent: unknown,
  args: MutationUpdateExpenseGroupArgs,
) {
  const { expenseGroupId, input } = args;
  await ExpenseGroupModel.findByIdAndUpdate(expenseGroupId, input);
}

export async function deleteExpenseGroup(
  parent: any,
  args: MutationDeleteExpenseGroupArgs,
) {
  await ExpenseGroupModel.deleteOne({ _id: args.expenseGroupId });
}

export async function deleteExpense(
  parent: any,
  args: MutationDeleteExpenseArgs,
) {
  const { expenseGroupId, expenseId } = args;
  await ExpenseGroupModel.findOneAndUpdate(
    { _id: expenseGroupId },
    { $pull: { expenses: { _id: expenseId } } },
  );
}

export async function addExpense(
  parent: unknown,
  args: MutationAddExpenseArgs,
) {
  const { expenseGroupId, ...newExpense } = args;

  const expenseGroup = await ExpenseGroupModel.findById(expenseGroupId);
  expenseGroup.expenses.push(newExpense);
  expenseGroup.save();
}

export async function updateExpense(
  parent: unknown,
  args: MutationUpdateExpenseArgs,
) {
  const { expenseGroupId, ...updatedExpense } = args;

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
}

export async function updateExpensePaidStatus(
  parent: unknown,
  args: MutationUpdateExpensePaidStatusArgs,
) {
  const { expenseGroupId, expenseId, isPaid } = args;

  await ExpenseGroupModel.findOneAndUpdate(
    { _id: expenseGroupId, 'expenses._id': expenseId },
    {
      $set: {
        'expenses.$.isPaid': isPaid,
      },
    },
  );
}

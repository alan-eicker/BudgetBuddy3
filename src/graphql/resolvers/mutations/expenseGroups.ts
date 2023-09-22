import {
  Expense,
  ExpenseGroup,
  MutationAddExpenseGroupArgs,
  MutationDeleteExpenseGroupArgs,
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
  const expenseGroup = new ExpenseGroupModel(args);
  await expenseGroup.save();
}

export async function deleteExpenseGroup(
  parent: any,
  args: MutationDeleteExpenseGroupArgs,
) {
  await ExpenseGroupModel.deleteOne({ _id: args.expenseGroupId });
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

export async function updateExpenseGroup(
  parent: unknown,
  args: MutationUpdateExpenseGroupArgs,
) {
  console.log(args);
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

import {
  Expense,
  AddExpenseMutationVariables,
} from '../../../generated/graphql';

export function addExpense(
  parent: unknown,
  args: AddExpenseMutationVariables,
): Expense {
  return {
    id: Math.round(Math.random() * 1000000).toString(),
    name: args.name,
    balance: args.balance,
    dueDate: args.dueDate,
    isPaid: args.isPaid,
  };
}

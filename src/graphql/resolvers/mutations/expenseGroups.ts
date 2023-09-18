import {
  ExpenseGroup,
  AddExpenseGroupMutationVariables,
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

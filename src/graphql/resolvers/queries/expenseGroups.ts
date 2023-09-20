import {
  ExpenseGroup,
  QueryGetExpenseGroupByIdArgs,
} from '@/graphql/generated/graphql';
import ExpenseGroupModel from '@/database/models/expenseGroup';

export async function getAllExpenseGroups(): Promise<ExpenseGroup[]> {
  return await ExpenseGroupModel.find();
}

export async function getExpenseGroupById(
  _: any,
  args: QueryGetExpenseGroupByIdArgs,
): Promise<ExpenseGroup | null> {
  return await ExpenseGroupModel.findById(args._id);
}

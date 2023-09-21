import {
  ExpenseGroup,
  QueryGetExpenseGroupByIdArgs,
} from '@/graphql/generated/graphql';
import ExpenseGroupModel from '@/database/models/expenseGroup';

export async function getAllExpenseGroups(): Promise<ExpenseGroup[]> {
  const expenseGroups = await ExpenseGroupModel.find();
  expenseGroups.sort(
    (a: ExpenseGroup, b: ExpenseGroup) =>
      new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf(),
  );
  return expenseGroups;
}

export async function getExpenseGroupById(
  _: any,
  args: QueryGetExpenseGroupByIdArgs,
): Promise<ExpenseGroup | null> {
  return await ExpenseGroupModel.findById(args._id);
}

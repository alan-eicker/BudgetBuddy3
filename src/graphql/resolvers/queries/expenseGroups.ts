import { ExpenseGroup } from '@/generated/graphql';
import ExpenseGroupModel from '@/database/models/expenseGroup';

export async function getAllExpenseGroups(): Promise<ExpenseGroup[]> {
  return await ExpenseGroupModel.find({});
}

export async function getExpenseGroupById(parent, args): ExpenseGroup {
  return await ExpenseGroupModel.findById(args._id);
}

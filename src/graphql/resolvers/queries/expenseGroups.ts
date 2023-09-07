import { ExpenseGroup, StatusResponse } from '@/generated/graphql';
import ExpenseGroupModel from '@/database/models/expenseGroup';

export async function getAllExpenseGroups(): Promise<ExpenseGroup[]> {
  return await ExpenseGroupModel.find({});
}

export async function getExpenseGroupById(parent, args): Promise<ExpenseGroup> {
  return await ExpenseGroupModel.findById(args._id);
}

export async function deleteExpenseGroup(
  parent,
  args,
): Promise<StatusResponse> {
  try {
    await ExpenseGroupModel.deleteOne({ _id: args._id });
    return {
      code: 200,
    };
  } catch (err) {
    return {
      code: 500,
      message: `Could not delete expense group ${args._id}`,
    };
  }
}

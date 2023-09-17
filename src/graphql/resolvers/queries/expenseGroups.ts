import {
  ExpenseGroup,
  StatusResponse,
  QueryGetExpenseGroupByIdArgs,
  QueryDeleteExpenseGroupArgs,
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

import { Expense, ExpenseArgs } from '../../interfaces';

const Mutation = {
  addExpense: (parent: unknown, args: ExpenseArgs): Expense => {
    return {
      id: Math.round(Math.random() * 1000000).toString(),
      name: args.name,
      balance: args.balance,
      isPaid: args.isPaid,
    };
  },
};

export default Mutation;

import { v4 as uuid } from 'uuid';

const Mutation = {
  addExpense: (
    parent: unknown,
    args: { name: string; balance: number; isPaid: boolean },
  ) => ({
    id: uuid(),
    name: args.name,
    balance: args.balance,
    isPaid: args.isPaid,
  }),
};

export default Mutation;

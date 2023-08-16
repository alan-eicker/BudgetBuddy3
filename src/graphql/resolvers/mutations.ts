const Mutation = {
  addExpense: (
    parent: unknown,
    args: { name: string; balance: number; isPaid: boolean },
  ) => ({ id: '1', name: 'ComEd', balance: 123.44, isPaid: true }),
};

export default Mutation;

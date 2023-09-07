import { ExpenseGroup } from '../../../generated/graphql';

const expenseGroups = [
  {
    id: '1',
    startDate: '09/01/2023',
    endDate: '00/15/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '09/01/2023',
        isPaid: false,
        note: 'Pay on the 5th of the month.',
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 240.56,
        dueDate: '09/15/2023',
        isPaid: false,
        note: null,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '09/20/2023',
        isPaid: false,
        note: null,
      },
      {
        id: '3',
        name: 'Nicor',
        balance: 234.1,
        dueDate: '09/23/2023',
        isPaid: true,
        note: null,
      },
      {
        id: '3',
        name: 'Gym',
        balance: 10.0,
        dueDate: '09/27/2023',
        isPaid: false,
        note: null,
      },
    ],
  },
  {
    id: '2',
    startDate: '08/15/2023',
    endDate: '08/31/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '08/16/2023',
        isPaid: true,
        note: null,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 320.99,
        dueDate: '08/21/2023',
        isPaid: false,
        note: null,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '08/31/2023',
        isPaid: false,
        note: null,
      },
    ],
  },
];

export function getAllExpenseGroups(): ExpenseGroup[] {
  return expenseGroups;
}

export function getExpenseGroupById(
  parent,
  args: { id: string },
): ExpenseGroup {
  return expenseGroups.find((group) => group.id === args.id);
}

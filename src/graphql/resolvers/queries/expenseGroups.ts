import { ExpenseGroup } from '../../../generated/graphql';

const expenseGroups = [
  {
    id: '1',
    name: '08/01/2023 - 08/15/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '08/05/2023',
        isPaid: true,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 240.56,
        dueDate: '08/10/2023',
        isPaid: false,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '08/19/2023',
        isPaid: false,
      },
      {
        id: '3',
        name: 'Nicor',
        balance: 234.1,
        dueDate: '08/19/2023',
        isPaid: true,
      },
      {
        id: '3',
        name: 'Gym',
        balance: 10.0,
        dueDate: '08/27/2023',
        isPaid: false,
      },
    ],
  },
  {
    id: '2',
    name: '08/15/2023 - 08/31/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '08/16/2023',
        isPaid: true,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 320.99,
        dueDate: '08/21/2023',
        isPaid: true,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '08/31/2023',
        isPaid: false,
      },
    ],
  },
  {
    id: '3',
    name: '09/01/2023 - 09/15/2023',
    totalBudget: 5467.0,
    expenses: null,
  },
  {
    id: '4',
    name: '08/01/2023 - 08/15/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '08/05/2023',
        isPaid: true,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 240.56,
        dueDate: '08/10/2023',
        isPaid: true,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '08/14/2023',
        isPaid: true,
      },
    ],
  },
  {
    id: '5',
    name: '08/15/2023 - 08/31/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '08/16/2023',
        isPaid: true,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 320.99,
        dueDate: '06/21/2023',
        isPaid: false,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '08/31/2023',
        isPaid: true,
      },
    ],
  },
  {
    id: '6',
    name: '09/01/2023 - 09/15/2023',
    totalBudget: 5467.0,
    expenses: [
      {
        id: '1',
        name: 'Mortgage',
        balance: 2500.44,
        dueDate: '09/01/2023',
        isPaid: true,
      },
      {
        id: '2',
        name: 'ComEd',
        balance: 225.12,
        dueDate: '09/12/2023',
        isPaid: false,
      },
      {
        id: '3',
        name: 'T-Mobile',
        balance: 131.32,
        dueDate: '09/14/2023',
        isPaid: false,
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

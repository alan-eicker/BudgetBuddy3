export interface ExpenseGroup {
  id: string;
  name: string;
  expenses: Expense[];
}

export interface Expense {
  id: string;
  name: string;
  balance: number;
  dueDate: string;
  isPaid: boolean;
}

export interface ExpenseArgs {
  name: string;
  balance: number;
  dueDate: string;
  isPaid: boolean;
}

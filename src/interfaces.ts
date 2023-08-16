export interface Expense {
  id: string;
  name: string;
  balance: number;
  isPaid: boolean;
}

export interface ExpenseArgs {
  name: string;
  balance: number;
  isPaid: boolean;
}

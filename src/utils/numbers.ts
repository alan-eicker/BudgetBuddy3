import { getDaysPastDue } from './date';
import { Expense } from '@/generated/graphql';

export function formatNumber(num: number): string {
  return num.toLocaleString('en', {
    minimumFractionDigits: 2,
  });
}

export function getTotalBalanceOfAllExpenses(
  expenses: Expense[],
  key: keyof Expense,
): number {
  return expenses.reduce(
    (accumulatedValue: number, nextExpense: Expense) =>
      accumulatedValue + (nextExpense[key] as number),
    0,
  );
}

export function getTotalUnpaidExpenses(
  expenses: Expense[],
  key: keyof Expense,
): number {
  return expenses.reduce(
    (accumulatedValue: number, nextExpense: Expense) =>
      nextExpense.isPaid
        ? accumulatedValue + (nextExpense[key] as number)
        : accumulatedValue,
    0,
  );
}

export function getOverDueBalance(expenses: Expense[]): number {
  return expenses.reduce(
    (prevValue, nextValue) =>
      nextValue.dueDate &&
      !nextValue.isPaid &&
      getDaysPastDue(nextValue.dueDate).isPastDue
        ? prevValue + 1
        : prevValue,
    0,
  );
}

export function getDifference(num1: number, num2: number): number {
  return num1 - num2;
}

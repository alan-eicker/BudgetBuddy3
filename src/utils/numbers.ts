import { getDaysPastDue } from './date';

export function formatNumber(num: number): string {
  return num.toLocaleString('en', {
    minimumFractionDigits: 2,
  });
}

export function getSubTotalFromCollection<T>(
  collection: T[],
  key: keyof T,
): number {
  return collection.reduce(
    (previousValue: number, nextValue: T) =>
      previousValue + (nextValue[key] as number),
    0,
  );
}

export function getUnpaidBalanceFromCollection<T extends { paid: boolean }>(
  collection: T[],
  key: keyof T,
): number {
  return collection.reduce(
    (previousValue: number, nextValue: T) =>
      !nextValue.paid
        ? previousValue + (nextValue[key] as number)
        : previousValue,
    0,
  );
}

export function getOverDueExpenses<
  T extends { dueDate: string; paid: boolean },
>(expenses: T[]): number {
  return expenses.reduce(
    (prevValue, nextValue) =>
      nextValue.dueDate &&
      !nextValue.paid &&
      getDaysPastDue(nextValue.dueDate).isPastDue
        ? prevValue + 1
        : prevValue,
    0,
  );
}

export function getLeftOverBalance(
  totalBudget: number,
  subtotal: number,
): number {
  return totalBudget - subtotal;
}

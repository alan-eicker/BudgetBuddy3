import { getDaysPastDue } from './date';

export const formatNumber = (num: number): string =>
  num.toLocaleString('en', {
    minimumFractionDigits: 2,
  });

export const getSubTotalFromCollection = <T>(
  collection: T[],
  key: keyof T,
): number =>
  collection.reduce(
    (previousValue: number, nextValue: T) =>
      previousValue + (nextValue[key] as number),
    0,
  );

export const getUnpaidBalanceFromCollection = <T extends { paid: boolean }>(
  collection: T[],
  key: keyof T,
): number =>
  collection.reduce(
    (previousValue: number, nextValue: T) =>
      !nextValue.paid
        ? previousValue + (nextValue[key] as number)
        : previousValue,
    0,
  );

export const getOverDueExpenses = <
  T extends { dueDate: string; paid: boolean },
>(
  expenses: T[],
): number =>
  expenses.reduce(
    (prevValue, nextValue) =>
      nextValue.dueDate &&
      !nextValue.paid &&
      getDaysPastDue(nextValue.dueDate).isPastDue
        ? prevValue + 1
        : prevValue,
    0,
  );

export const getLeftOverBalance = (
  totalBudget: number,
  subtotal: number,
): number => totalBudget - subtotal;

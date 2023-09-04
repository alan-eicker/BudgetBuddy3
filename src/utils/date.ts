export const formatDate = (dateStr: string) => {
  const dateStrParts = dateStr.split('-');
  const dateStrYear = dateStrParts.shift();
  return [...dateStrParts, dateStrYear].join('/');
};

export function getDaysPastDue(date: string): {
  isPastDue: boolean;
  daysOverdue: number;
} {
  const now = new Date().valueOf();
  const dueDate = new Date(date).valueOf();
  const timeDifference = Math.abs(now - dueDate);
  const isPastDue = now > dueDate;
  const daysOverdue = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return { isPastDue, daysOverdue };
}

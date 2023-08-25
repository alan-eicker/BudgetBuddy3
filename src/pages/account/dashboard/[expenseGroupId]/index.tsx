import Link from 'next/link';

const ExpenseGroupDetail = (): JSX.Element => {
  return (
    <div style={{ padding: 30 }}>
      <Link href="/account/dashboard">&laquo; Back to dashboard</Link>
    </div>
  );
};

export default ExpenseGroupDetail;

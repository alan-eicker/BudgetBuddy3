import { dehydrate, useQuery } from 'react-query';
import { queryClient, getExpenses } from '../../../api';

export async function getServerSideProps() {
  await queryClient.prefetchQuery(['expenses'], () => getExpenses());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ExpenseGroups = () => {
  const { data } = useQuery(['expenses'], () => getExpenses());

  return <pre>{JSON.stringify(data?.expenses, null, 2)}</pre>;
};

export default ExpenseGroups;

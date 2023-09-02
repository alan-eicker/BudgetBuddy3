import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from 'react-query';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import ContentSection from '@/components/presentational/ContentSection';
import Card from '@/components/presentational/Card';
import { queryClient, getExpenseGroupById } from '@/api';
import { GetExpenseGroupByIdQuery } from '@/generated/graphql';
import { useOverlayContext } from '../../providers/OverlayProvider';
import styles from './ExpenseGroupDetail.module.scss';
import { useEffect } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.expenseGroupId as string;
  await queryClient.prefetchQuery<GetExpenseGroupByIdQuery>(
    ['expenseGroup' + id],
    () => getExpenseGroupById({ id }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ExpenseGroupDetail = (): JSX.Element => {
  const { query } = useRouter();
  const { setShowOverlay } = useOverlayContext();

  const { data } = useQuery<GetExpenseGroupByIdQuery>(
    ['expenseGroup' + query.expenseGroupId],
    () => getExpenseGroupById({ id: query.expenseGroupId as string }),
  );

  useEffect(() => {
    setShowOverlay(!data);
  }, [data, setShowOverlay]);

  if (!data) return <></>;

  const { name, totalBudget, expenses } = data.expenseGroup;

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <ContentSection>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} className={styles.headLeft}>
              <Button href="/account/dashboard" size="small">
                &laquo; Back to dashboard
              </Button>
              <Typography component="h1" variant="h4">
                {name}
              </Typography>
              <Typography component="h2" variant="h6">
                Total Budget: ${totalBudget.toFixed(2)}
              </Typography>
            </Grid>
            <Grid
              alignItems="center"
              item
              xs={12}
              sm={6}
              md={6}
              className={styles.headRight}
            >
              <Button variant="contained" size="small">
                Edit Group
              </Button>
              <Button variant="contained" size="small">
                Duplicate
              </Button>
              <Button color="error" variant="contained" size="small">
                Delete
              </Button>
            </Grid>
          </Grid>
        </ContentSection>
      </div>
      <div className={styles.body}>
        <ContentSection>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={8}>
              <ul>
                {expenses.map((expense) => (
                  <li key={expense?.id}>
                    <Card
                      head={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>{expense?.name}</div>
                          <div>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                          </div>
                        </div>
                      }
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          Balance: ${expense?.balance.toFixed(2)}
                          <br />
                          Due Date: {expense?.dueDate}
                        </div>
                        <div>
                          Paid
                          <Switch checked={expense?.isPaid} />
                        </div>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              Right col...
            </Grid>
          </Grid>
        </ContentSection>
      </div>
    </div>
  );
};

export default ExpenseGroupDetail;

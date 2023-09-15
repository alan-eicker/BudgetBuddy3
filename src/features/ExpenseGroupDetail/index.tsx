import mongoose from 'mongoose';
import {
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Modal from '@mui/material/Modal';
import ContentSection from '@/components/ContentSection';
import SpendingSnapshot from '@/components/SpendingSnapshot';
import ExpenseCard from '@/components/ExpenseCard';
import { queryClient, getExpenseGroupById, deleteExpenseGroup } from '@/api';
import {
  GetExpenseGroupByIdQuery,
  Expense,
  DeleteExpenseGroupQuery,
} from '@/graphql/generated/graphql';
import {
  formatNumber,
  getTotalBalanceOfAllExpenses,
  getTotalUnpaidExpenses,
  isOverDue,
} from '@/utils/expenses';
import { useAppContext } from '@/providers/AppProvider';
import { useExpenseFormModalContext } from '@/providers/ExpenseFormModalProvider';
import styles from './ExpenseGroupDetail.module.scss';

interface DeleteAction {
  _id: string;
  onCancel: Dispatch<SetStateAction<Object | undefined>>;
  onConfirm: () => Promise<void>;
  message: string | ReactNode;
}

const ExpenseGroupDetail = (): JSX.Element => {
  const router = useRouter();
  const { setExpenseFormState } = useExpenseFormModalContext();

  const {
    query: { expenseGroupId },
  } = router;
  const [deleteAction, setDeleteAction] = useState<DeleteAction>();

  const { data } = useQuery<GetExpenseGroupByIdQuery>(
    ['expenseGroup' + expenseGroupId],
    () => getExpenseGroupById({ _id: expenseGroupId as string }),
  );

  const { actions } = useAppContext();

  const handleExpenseGroupDelete = async () => {
    setShowOverlay(true);

    const { status } = await queryClient.fetchQuery<DeleteExpenseGroupQuery>(
      ['deleteExpenseGroup' + expenseGroupId],
      () => deleteExpenseGroup({ _id: expenseGroupId as string }),
    );

    if (status.code === 200) {
      queryClient.removeQueries('expenseGroups');
      router.push('/account/dashboard');
    }
  };

  const addNewExpense = (newExpense: Expense) => {
    console.log(newExpense);
  };

  const updateExpense = (newExpense: Expense) => {
    console.log(newExpense);
  };

  const mapOverdueStatustoExpenses = (expenses: Expense[]) => {
    return expenses.map((expense) => ({
      ...expense,
      isOverdue: isOverDue(expense),
    }));
  };

  useEffect(() => {
    if (!data) {
      router.push('/account/dashboard');
    }
  }, [data, router]);

  if (!data) return <></>;

  let totalBalance = 0;
  let unpaidExpenses = 0;
  let getLeftOverBalance = 0;

  const { startDate, endDate, totalBudget, expenses } = data.expenseGroup;

  if (expenses) {
    totalBalance = getTotalBalanceOfAllExpenses(expenses, 'balance');
    unpaidExpenses = getTotalUnpaidExpenses(expenses, 'balance');
    getLeftOverBalance = totalBudget - totalBalance;
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.head}>
        <ContentSection>
          <Grid container spacing={2}>
            <Grid className={styles.headLeft} item xs={12} sm={6} md={6}>
              <Button
                onClick={() => router.push('/account/dashboard')}
                size="small"
              >
                &laquo; Back to dashboard
              </Button>
              <Typography component="h1" variant="h4">
                {`${startDate} - ${endDate}`}
              </Typography>
              <Typography component="h2" variant="h6">
                Total Budget: ${formatNumber(totalBudget)}
              </Typography>
            </Grid>
            <Grid
              className={styles.headRight}
              alignItems="center"
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Button
                className="text-center"
                variant="contained"
                size="small"
                onClick={() => {}}
              >
                Edit Group
              </Button>
              <Button
                className="text-center"
                variant="contained"
                size="small"
                onClick={() => {}}
              >
                Duplicate Group
              </Button>
              <Button
                className="text-center"
                color="error"
                variant="contained"
                size="small"
                onClick={() =>
                  setDeleteAction({
                    _id: expenseGroupId as string,
                    onCancel: () => setDeleteAction(undefined),
                    onConfirm: handleExpenseGroupDelete,
                    message:
                      'Are you sure you want to delete this expense group?',
                  })
                }
              >
                Delete Group
              </Button>
            </Grid>
          </Grid>
        </ContentSection>
        <Box style={{ backgroundColor: '#212a3b' }}>
          <ContentSection compressed>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={8} textAlign="right">
                <Button
                  onClick={() =>
                    setExpenseFormState({
                      onSubmitCallback: addNewExpense,
                    })
                  }
                >
                  + Add Expense
                </Button>
              </Grid>
            </Grid>
          </ContentSection>
        </Box>
      </Box>
      <Box className={styles.body}>
        <ContentSection noPaddingTop>
          {!expenses && <Typography>No expense data to display.</Typography>}
          {expenses && (
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={8}>
                <List
                  className={styles.expenseGroupList}
                  style={{ marginTop: 1 }}
                  disablePadding
                >
                  {mapOverdueStatustoExpenses(expenses).map((expense) => (
                    <ListItem disablePadding key={expense._id}>
                      <ExpenseCard
                        {...expense}
                        actions={[
                          <Button
                            key="edit-button"
                            onClick={() =>
                              setExpenseFormState({
                                expense,
                                onSubmitCallback: updateExpense,
                              })
                            }
                          >
                            Edit
                          </Button>,
                          <Button
                            key="delete-button"
                            onClick={() =>
                              setDeleteAction({
                                _id: expenseGroupId as string,
                                onCancel: () => setDeleteAction(undefined),
                                onConfirm: () => {},
                                message: `Are you sure you want to delete ${expense.name}?`,
                              })
                            }
                          >
                            Delete
                          </Button>,
                        ]}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box className={styles.spendingSnapshotFixedContainer}>
                  {/* TODO: get trending status */}
                  <SpendingSnapshot
                    items={[
                      ['Total Balance', formatNumber(totalBalance)],
                      ['Unpaid Balance', formatNumber(unpaidExpenses)],
                      ['Left Over Balance', formatNumber(getLeftOverBalance)],
                    ]}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </ContentSection>
      </Box>
      {deleteAction && (
        <Modal open={true}>
          <Box className={styles.modal}>
            <Box padding={2.5} fontSize={18} component="h2">
              {deleteAction.message}
            </Box>
            <Box
              className={styles.modalButtons}
              textAlign="center"
              padding={2.5}
            >
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={deleteAction.onCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={deleteAction.onConfirm}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default ExpenseGroupDetail;

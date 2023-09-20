import {
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ContentSection from '@/components/ContentSection';
import SpendingSnapshot from '@/components/SpendingSnapshot';
import ExpenseCard from '@/components/ExpenseCard';
import ConfirmationModal from '@/components/ConfirmationModal';
import DuplicateExpenseGroupModal from '@/features/DuplicateExpenseGroupModal';
import Alert from '@/components/Alert';
import useExpenseGroupDetail from './useExpenseGroupDetail';
import { ExpenseGroup } from '@/graphql/generated/graphql';
import {
  formatNumber,
  getTotalBalanceOfAllExpenses,
  getTotalUnpaidExpenses,
} from '@/utils/expenses';
import { useExpenseFormModalContext } from '@/providers/ExpenseFormModalProvider';
import { COLORS } from '@/constants';
import styles from './ExpenseGroupDetail.module.scss';

interface DeleteAction {
  _id: string;
  onCancel: Dispatch<SetStateAction<undefined>>;
  onConfirm: () => void;
  message: string | ReactNode;
}

interface DuplicateAction {
  onCancel: Dispatch<SetStateAction<undefined>>;
  onSave: (formData: ExpenseGroup) => void;
  message?: string | ReactNode;
  expenseGroup: ExpenseGroup;
}

export default function ExpenseGroupDetail() {
  const router = useRouter();
  const { setExpenseFormState } = useExpenseFormModalContext();
  const {
    data,
    error,
    handleExpenseGroupDuplicate,
    handleExpenseGroupDelete,
    handleAddExpense,
    handleUpdateExpense,
    handleUpdateExpensePaidStatus,
    handleDeleteExpense,
    mapOverdueStatustoExpenses,
  } = useExpenseGroupDetail();

  const {
    query: { expenseGroupId },
  } = router;

  const [deleteAction, setDeleteAction] = useState<DeleteAction>();
  const [duplicateAction, setDuplicateAction] = useState<DuplicateAction>();

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
                onClick={() =>
                  setDuplicateAction({
                    onCancel: () => setDuplicateAction(undefined),
                    onSave: (formData) => handleExpenseGroupDuplicate(formData),
                    expenseGroup: data.expenseGroup,
                  })
                }
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
        <Box style={{ backgroundColor: COLORS.brand }}>
          <ContentSection compressed>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={8} textAlign="right">
                <Button
                  onClick={() =>
                    setExpenseFormState({
                      onSubmitCallback: handleAddExpense,
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
                {error && (
                  <Box marginBottom={2}>
                    <Alert variant="outlined" color="error">
                      {error}
                    </Alert>
                  </Box>
                )}
                <List
                  className={styles.expenseGroupList}
                  style={{ marginTop: 1 }}
                  disablePadding
                >
                  {mapOverdueStatustoExpenses(expenses).map((expense) => (
                    <ListItem disablePadding key={expense._id || expense.name}>
                      <ExpenseCard
                        {...expense}
                        onPaidChange={(isPaid) =>
                          handleUpdateExpensePaidStatus(
                            isPaid,
                            expenseGroupId as string,
                            expense._id as string,
                          )
                        }
                        actions={[
                          <Button
                            key="edit-button"
                            onClick={() =>
                              setExpenseFormState({
                                expense,
                                onSubmitCallback: handleUpdateExpense,
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
                                onConfirm: () =>
                                  handleDeleteExpense(expense._id as string),
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
                      ['Total Balance', `$${formatNumber(totalBalance)}`],
                      ['Unpaid Balance', `$${formatNumber(unpaidExpenses)}`],
                      [
                        'Left Over Balance',
                        `$${formatNumber(getLeftOverBalance)}`,
                      ],
                    ]}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </ContentSection>
      </Box>
      {deleteAction && <ConfirmationModal {...deleteAction} />}
      {duplicateAction && <DuplicateExpenseGroupModal {...duplicateAction} />}
    </Box>
  );
}

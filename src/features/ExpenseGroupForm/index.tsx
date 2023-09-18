import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import ContentSection from '@/components/ContentSection';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@/components/Alert';
import PipeList from '@/components/PipeList';
import { useAppContext } from '@/providers/AppProvider';
import { useExpenseFormModalContext } from '@/providers/ExpenseFormModalProvider';
import { Expense, ExpenseGroup } from '@/graphql/generated/graphql';
import { formatNumber } from '@/utils/expenses';
import styles from './ExpenseGroupForm.module.scss';

const ExpenseGroupForm = (): JSX.Element => {
  const router = useRouter();
  const { setExpenseFormState } = useExpenseFormModalContext();
  const [duplicateExpenseError, setDuplicateExpenseError] = useState<
    string | null
  >();

  const initialValues = {
    startDate: null,
    endDate: null,
    totalBuget: '',
    expenses: [],
  };

  const validationSchema = yup.object({
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('Start date is required'),
    totalBuget: yup.string().required('Total budget is required'),
    expenses: yup.array().min(1).required('At least one expense is required'),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  const addExpense = (expense: Expense) => {
    expense.balance = +expense.balance;

    const alreadyExists = values.expenses.some(
      ({ name }) => name === expense.name,
    );

    if (alreadyExists) {
      setDuplicateExpenseError(`Expense "${expense.name}" already exists.`);
      return;
    }

    setFieldValue('expenses', [...values.expenses, expense]);
  };

  const editExpense = (expense: Expense, index: number) => {
    expense.balance = +expense.balance;

    const updatedExpenses = values.expenses.map((exp, expIndex) => {
      return expIndex === index ? expense : exp;
    });

    setFieldValue('expenses', updatedExpenses);
  };

  const deleteExpense = (index: number) => {
    values.expenses.splice(index, 1);
    setFieldValue('expenses', values.expenses);
  };

  const showAddExpenseForm = () => {
    setDuplicateExpenseError(null);
    setExpenseFormState({
      onSubmitCallback: (formData) => addExpense(formData),
    });
  };

  return (
    <ContentSection>
      <form onSubmit={handleSubmit} noValidate>
        <Typography component="h1" variant="h4" marginBottom={3}>
          Add Expense Group
        </Typography>
        <Box marginBottom={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <DatePicker
                  label="Start Date"
                  format="MM/DD/YYYY"
                  slotProps={{
                    textField: {
                      name: 'startDate',
                      fullWidth: true,
                      ...(!!(errors.startDate && touched.startDate) && {
                        error: true,
                        helperText: errors.startDate,
                      }),
                    },
                  }}
                  onChange={(date) => {
                    setFieldValue(
                      'startDate',
                      dayjs(date).format('MM/DD/YYYY'),
                    );
                  }}
                  value={values.startDate}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <DatePicker
                  label="End Date"
                  format="MM/DD/YYYY"
                  slotProps={{
                    textField: {
                      name: 'endDate',
                      fullWidth: true,
                      ...(!!(errors.endDate && touched.endDate) && {
                        error: true,
                        helperText: errors.endDate,
                      }),
                    },
                  }}
                  onChange={(date) => {
                    setFieldValue('endDate', dayjs(date).format('MM/DD/YYYY'));
                  }}
                  value={values.endDate}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  type="number"
                  name="totalBuget"
                  label="Total Budget"
                  fullWidth
                  onChange={handleChange}
                  value={values.totalBuget}
                  {...(!!(errors.totalBuget && touched.totalBuget) && {
                    error: true,
                    helperText: errors.totalBuget,
                  })}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
        <Box marginBottom={3}>
          <Typography component="h2" variant="h5" marginBottom={2}>
            Expenses
          </Typography>
          <Button size="small" onClick={showAddExpenseForm}>
            + Add Expense
          </Button>
          {duplicateExpenseError && (
            <Box marginTop={1} marginBottom={1}>
              <Alert
                color="error"
                variant="outlined"
                onDismiss={() => setDuplicateExpenseError(null)}
              >
                {duplicateExpenseError}
              </Alert>
            </Box>
          )}
          {!!(errors.expenses && touched.expenses) && (
            <Typography color="error" fontSize={13}>
              {errors.expenses}
            </Typography>
          )}
          {!!values.expenses.length && (
            <Box marginBottom={1} marginTop={1}>
              {values.expenses.map((expense: Expense, i) => {
                return (
                  <React.Fragment key={expense.name}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      padding={1}
                    >
                      <Box>
                        <Box>{expense.name}</Box>
                        <PipeList
                          className={styles.expenseList}
                          items={[
                            `Balance: $${formatNumber(expense.balance)}`,
                            `Due Date: ${expense.dueDate}`,
                            `Paid: ${JSON.stringify(expense.isPaid)}`,
                          ]}
                        />
                      </Box>
                      <Box minWidth={175} marginLeft={2}>
                        <Button size="small">
                          <EditIcon />
                          <Typography
                            marginLeft={0.5}
                            component="span"
                            fontSize={14}
                            onClick={() =>
                              setExpenseFormState({
                                expense,
                                onSubmitCallback: (formData) =>
                                  editExpense(formData, i),
                              })
                            }
                          >
                            Edit
                          </Typography>
                        </Button>
                        <Button
                          sx={{ marginLeft: 1 }}
                          size="small"
                          color="error"
                          onClick={() => deleteExpense(i)}
                        >
                          <ClearIcon />
                          <Typography
                            marginLeft={0.5}
                            component="span"
                            fontSize={14}
                          >
                            Delete
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                    {i + 1 !== values.expenses.length && <Divider />}
                  </React.Fragment>
                );
              })}
            </Box>
          )}
        </Box>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          Save
        </LoadingButton>
        <Button
          onClick={() => router.push('/account/dashboard')}
          variant="outlined"
          size="large"
          sx={{ marginLeft: 2 }}
        >
          Cancel
        </Button>
      </form>
    </ContentSection>
  );
};

export default ExpenseGroupForm;

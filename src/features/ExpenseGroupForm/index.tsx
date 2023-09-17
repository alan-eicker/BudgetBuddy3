import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import ContentSection from '@/components/ContentSection';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@/components/Alert';
import { useAppContext } from '@/providers/AppProvider';
import { useExpenseFormModalContext } from '@/providers/ExpenseFormModalProvider';
import { Expense } from '@/graphql/generated/graphql';

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

  const validationSchema = yup.object({});

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: () => {},
  });

  const addExpense = (expense: Expense) => {
    const alreadyExists = values.expenses.some(
      ({ name }) => name === expense.name,
    );

    if (alreadyExists) {
      setDuplicateExpenseError(`Expense "${expense.name}" already exists.`);
      return;
    }

    setFieldValue('expenses', [...values.expenses, expense]);
  };

  const deleteExpense = (index: number) => {
    values.expenses.splice(index, 1);
    setFieldValue('expenses', values.expenses);
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
                    textField: { name: 'startDate', fullWidth: true },
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
                    textField: { name: 'endDate', fullWidth: true },
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
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
        <Box marginBottom={3}>
          <Typography component="h2" variant="h5" marginBottom={2}>
            Expenses
          </Typography>
          <Button
            size="small"
            onClick={() => {
              setDuplicateExpenseError(null);
              setExpenseFormState({
                onSubmitCallback: (formData) => addExpense(formData),
              });
            }}
          >
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
          {!!values.expenses.length && (
            <Box marginBottom={1}>
              {values.expenses.map((expense: Expense, i) => {
                return (
                  <React.Fragment key={expense.name}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      paddingTop={1}
                      paddingBottom={1}
                    >
                      <Box>{expense.name}</Box>
                      <Box>
                        <Button size="small">
                          <EditIcon />
                          <Typography
                            marginLeft={0.5}
                            component="span"
                            fontSize={14}
                            onClick={() =>
                              setExpenseFormState({
                                expense,
                                onSubmitCallback: () => {},
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
        <Button variant="contained" size="large">
          Save
        </Button>
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

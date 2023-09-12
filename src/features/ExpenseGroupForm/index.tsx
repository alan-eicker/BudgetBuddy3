import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import ContentSection from '@/components/ContentSection';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppContext } from '@/providers/AppProvider';
import { actionCreators as actions } from '@/store';

const toFormattedDate = (date: string) => new Date(date).toLocaleDateString();

const ExpenseGroupForm = (): JSX.Element => {
  const router = useRouter();
  const { dispatch } = useAppContext();

  const initialValues = {
    startDate: null,
    endDate: null,
    totalBuget: '',
    expenses: [
      {
        name: 'Morgage',
        balance: 2345.04,
        dueDate: '9/30/2023',
        isPaid: false,
        note: null,
      },
      {
        name: 'ComEd',
        balance: 200.04,
        dueDate: '9/30/2023',
        isPaid: false,
        note: null,
      },
    ],
  };

  const validationSchema = yup.object({});

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: () => {},
  });

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
                  slotProps={{
                    textField: { name: 'startDate', fullWidth: true },
                  }}
                  onChange={(date) => {
                    if (date) setFieldValue('startDate', toFormattedDate(date));
                  }}
                  value={values.startDate}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <DatePicker
                  label="End Date"
                  slotProps={{
                    textField: { name: 'endDate', fullWidth: true },
                  }}
                  onChange={(date) => {
                    if (date) setFieldValue('endDate', toFormattedDate(date));
                  }}
                  value={values.endDate}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  type="number"
                  name="totalBuget"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Total Budget"
                  fullWidth
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
          {values.expenses && (
            <Box marginBottom={1}>
              {values.expenses.map((expense, i) => {
                return (
                  <React.Fragment key={expense.name || i}>
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
                          >
                            Edit
                          </Typography>
                        </Button>
                        <Button
                          sx={{ marginLeft: 1 }}
                          size="small"
                          color="error"
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
          <Button
            size="small"
            onClick={() => dispatch(actions.showExpenseFormModal(true))}
          >
            + Add Expense
          </Button>
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

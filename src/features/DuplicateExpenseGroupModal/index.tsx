import { ReactNode } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styles from './DuplicateExpenseGroupModal.module.scss';
import { ExpenseGroup } from '@/graphql/generated/graphql';

interface DuplicateExpenseGroupModalProp {
  message?: string | ReactNode;
  onSave: Function;
  onCancel: Function;
  expenseGroup: ExpenseGroup;
}

export default function DuplicateExpenseGroupModal({
  message,
  onCancel,
  onSave,
  expenseGroup,
}: DuplicateExpenseGroupModalProp) {
  const { startDate, endDate, totalBudget, expenses } = expenseGroup;
  const initialValues = { startDate, endDate, totalBudget };

  const validationSchema = yup.object();

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (formData) => {
        onSave({
          ...formData,
          expenses: expenses.map((expense) => ({
            ...expense,
            dueDate: '',
            isPaid: false,
            note: null,
          })),
        });
      },
    });

  return (
    <Modal open={true}>
      <Box className={styles.modal}>
        <Typography padding={2.5} variant="h5" component="h2">
          Duplicate Expense Group
        </Typography>
        <Box padding={2.5} paddingTop={0}>
          <Typography>{message}</Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              label="Start Date"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="normal"
              label="End Date"
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Total Budget"
              type="number"
              name="totalBudget"
              value={values.totalBudget}
              onChange={handleChange}
              autoComplete="off"
              fullWidth
            />
            <Box className={styles.modalButtons} paddingTop={2.5}>
              <Button variant="contained" type="submit" size="large">
                Duplicate
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}

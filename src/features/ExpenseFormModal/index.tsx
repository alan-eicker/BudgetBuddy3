import { Maybe } from 'graphql-yoga';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { EXPENSE_DROPDOWN_OPTIONS } from '@/constants';
import { useExpenseFormModalContext } from '@/providers/ExpenseFormModalProvider';
import { Expense } from '@/graphql/generated/graphql';
import styles from './ExpenseFormModal.module.scss';

interface ExpenseFormProps {
  open: boolean;
}

const expenseOptions = EXPENSE_DROPDOWN_OPTIONS.sort().map((title) => ({
  title,
}));

const ExpenseFormModal = ({ open = false }: ExpenseFormProps): JSX.Element => {
  const { expenseFormState, setExpenseFormState } =
    useExpenseFormModalContext();

  let initialValues: Expense;
  let expenseId: Maybe<string>;

  if (expenseFormState?.expense) {
    const { _id, ...expenseData } = expenseFormState.expense;
    expenseId = _id;
    initialValues = expenseData;
  } else {
    initialValues = {
      name: '',
      balance: 0,
      dueDate: '',
      isPaid: false,
      note: '',
    };
  }

  const validationSchema = yup.object({});

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: false,
      validateOnMount: false,
      onSubmit: (formData: Expense) => {
        console.log(formData);
        expenseFormState?.onSubmitCallback(formData);
        setExpenseFormState(null);
      },
    });

  return (
    <Modal open={open}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <Grid alignItems="center" marginBottom={2} container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Autocomplete
              freeSolo
              options={expenseOptions.map((option) => option.title)}
              onChange={(e, value) => {
                setFieldValue('name', value);
              }}
              value={values.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  name="name"
                  label="Expense Name"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <TextField
              label="Balance"
              name="balance"
              onChange={handleChange}
              fullWidth
              {...(values.balance && { value: values.balance })}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                format="MM/DD/YYYY"
                onChange={(date) => {
                  setFieldValue('dueDate', dayjs(date).format('MM/DD/YYYY'));
                }}
                slotProps={{
                  textField: {
                    name: 'dueDate',
                    fullWidth: true,
                  },
                }}
                {...(values.dueDate && { value: dayjs(values.dueDate) })}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2} md={4}>
            <FormLabel>Paid</FormLabel>
            <Switch
              name="isPaid"
              onChange={handleChange}
              checked={values.isPaid}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="Note"
              name="note"
              onChange={handleChange}
              value={values.note || ''}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant="contained" size="large" type="submit">
          Save
        </Button>
        <Button
          variant="outlined"
          size="large"
          style={{ marginLeft: 8 }}
          onClick={() => setExpenseFormState(null)}
        >
          Cancel
        </Button>
      </form>
    </Modal>
  );
};

export default ExpenseFormModal;

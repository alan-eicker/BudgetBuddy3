import { useFormik } from 'formik';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppContext } from '@/providers/AppProvider';
import { Expense } from '@/graphql/generated/graphql';
import styles from './ExpenseFormModal.module.scss';

interface ExpenseFormProps {
  open: boolean;
  onClose: () => void;
}

const expenseOptions = [
  'Morgage',
  'Day Care',
  'ComEd',
  'Nicor',
  'T-Moblie',
  'Water Bill',
  'Xfinity',
  'Groceries',
  'College Funds',
  'Stash Investments',
  'Gas',
  'Gym',
  'Jeep Payment',
  'Therapist',
  'Medical Payment',
]
  .sort()
  .map((title) => ({ title }));

const ExpenseForm = ({
  open = false,
  onClose,
}: ExpenseFormProps): JSX.Element => {
  const {
    state: { expenseToEdit },
  } = useAppContext();

  let initialValues: Expense;
  let expenseId;

  if (
    expenseToEdit &&
    typeof expenseToEdit === 'object' &&
    '_id' in expenseToEdit
  ) {
    const { _id, ...expense } = expenseToEdit as Expense;
    expenseId = _id;
    initialValues = expense;
  } else {
    initialValues = {
      name: '',
      balance: 0,
      dueDate: '',
      isPaid: false,
      note: '',
    };
  }

  console.log(initialValues);

  const validationSchema = yup.object({});

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: () => {},
  });

  return (
    <Modal open={open}>
      <form className={styles.modal}>
        <Grid alignItems="center" marginBottom={2} container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Autocomplete
              freeSolo
              options={expenseOptions.map((option) => option.title)}
              value={values.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  name="name"
                  label="Expense Name"
                  onChange={handleChange}
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
              value={values.balance}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
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
        <Button variant="contained" size="large">
          Save
        </Button>
        <Button
          variant="outlined"
          size="large"
          style={{ marginLeft: 8 }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </form>
    </Modal>
  );
};

export default ExpenseForm;

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
import { actionCreators as actions } from '@/store';
import { EXPENSE_DROPDOWN_OPTIONS } from '@/constants';
import { Expense } from '@/graphql/generated/graphql';
import { toFormattedDate } from '@/utils/date';
import styles from './ExpenseFormModal.module.scss';

interface ExpenseFormProps {
  open: boolean;
  onClose: () => void;
}

const expenseOptions = EXPENSE_DROPDOWN_OPTIONS.sort().map((title) => ({
  title,
}));

const ExpenseFormModal = ({
  open = false,
  onClose,
}: ExpenseFormProps): JSX.Element => {
  const {
    dispatch,
    state: { expenseToEdit },
  } = useAppContext();

  let initialValues: Expense;
  let expenseId: string;

  if (
    expenseToEdit &&
    typeof expenseToEdit === 'object' &&
    '_id' in expenseToEdit
  ) {
    const { _id, ...expense } = expenseToEdit;
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

  const validationSchema = yup.object({});

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: false,
      validateOnMount: false,
      onSubmit: () => {
        if (expenseId) {
          // 1. Mutation to update existing expense
          // dispatch(actions.updateExpense(values, expenseId));
          // 2. Cache will have to be invalidated so expenses reflect changes
        } else {
          // 1. Mutation to add new expense
          // dispatch(actions.addExpense(values, expenseId));
          // 2. Cache will have to be invalidated so expenses reflect changes
        }
      },
    });

  return (
    <Modal open={open}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        {JSON.stringify(values, null, 2)}
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
                onChange={(date) => {
                  if (date) setFieldValue('dueDate', toFormattedDate(date));
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
          onClick={onClose}
        >
          Cancel
        </Button>
      </form>
    </Modal>
  );
};

export default ExpenseFormModal;

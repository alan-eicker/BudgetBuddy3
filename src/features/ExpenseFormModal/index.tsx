import { Dispatch, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@mui/material/FormLabel';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './ExpenseFormModal.module.scss';

interface ExpenseFormProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const ExpenseForm = ({
  open = false,
  onClose,
}: ExpenseFormProps): JSX.Element => {
  return (
    <Modal open={open}>
      <form className={styles.modal}>
        <Grid alignItems="center" marginBottom={2} container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField label="Expense Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <TextField
              label="Balance"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                slotProps={{
                  textField: { name: 'dueDate', fullWidth: true },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2} md={4}>
            <FormLabel>Paid</FormLabel>
            <Switch />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField label="Note" fullWidth />
          </Grid>
        </Grid>
        <Button variant="contained" size="large">
          Save
        </Button>
        <Button
          variant="outlined"
          size="large"
          style={{ marginLeft: 8 }}
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
      </form>
    </Modal>
  );
};

export default ExpenseForm;

import { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
  return (
    <Modal open={true}>
      <Box className={styles.modal}>
        <Typography padding={2.5} variant="h5" component="h2">
          Duplicate Expense Group
        </Typography>
        <Typography>{message}</Typography>
        <form>{JSON.stringify(expenseGroup)}</form>
        <Box className={styles.modalButtons} textAlign="center" padding={2.5}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => onSave(expenseGroup)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

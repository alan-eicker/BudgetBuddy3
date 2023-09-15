import { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  message: string | ReactNode;
  onConfirm: Function;
  onCancel: Function;
}

const ConfirmationModal = ({
  message,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) => (
  <Modal open={true}>
    <Box className={styles.modal}>
      <Box padding={2.5} fontSize={18} component="h2">
        {message}
      </Box>
      <Box className={styles.modalButtons} textAlign="center" padding={2.5}>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button variant="contained" size="small" onClick={() => onConfirm()}>
          Delete
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default ConfirmationModal;

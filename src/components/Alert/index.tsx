import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UnknownFuntionType } from '@/types/functions';

const Alert = ({
  children,
  onDismiss,
  ...props
}: AlertProps & { onDismiss?: UnknownFuntionType<any> }) => (
  <MuiAlert
    {...(onDismiss && {
      action: (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onDismiss}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      ),
    })}
    {...props}
  >
    {children}
  </MuiAlert>
);

export default Alert;

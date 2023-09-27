import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface EmailSearchFormProps {
  onSearch: (email: string) => any;
}

export default function EmailSearchForm({ onSearch }: EmailSearchFormProps) {
  const initialValues = {
    email: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid email format',
      )
      .required('Email is required'),
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (formData) => {},
    });

  return (
    <form>
      <Box padding={4}>
        <Typography component="h1" variant="h4" marginBottom={3}>
          Let&apos;s start by finding your email address
        </Typography>
        <Typography marginBottom={4}>
          In order to reset your password, we&apos;ll first need to find the
          email address associated with your account.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box display="flex" alignItems="center">
              <TextField name="email" label="Email Address" fullWidth />
              <LoadingButton
                sx={{ height: 56, marginLeft: 1.5 }}
                variant="contained"
                onClick={onSearch}
              >
                Submit
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

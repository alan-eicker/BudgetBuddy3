import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface EmailSearchFormProps {
  onSearch: (email: string) => any;
  isDone: boolean;
}

export default function EmailSearchForm({
  isDone,
  onSearch,
}: EmailSearchFormProps) {
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

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formData) => {
      onSearch(formData.email);
    },
  });

  useEffect(() => {
    if (isDone) {
      setSubmitting(false);
    }
  }, [isDone, setSubmitting]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            autoComplete="off"
            name="email"
            label="Email Address"
            onChange={handleChange}
            value={values.email}
            fullWidth
            {...(!!(errors.email && touched.email) && {
              error: true,
              helperText: errors.email,
            })}
          />
          <Box marginBottom={2} />
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}

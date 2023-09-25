import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import BrandLogo from '@/components/BrandLogo';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { createUser } from '@/api';

export default function RegisterUserForm() {
  const [error, setError] = useState<string>();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {},
    onError: () => {
      setError('Error creating new user');
    },
  });

  const initialValues = {
    email: '',
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid email format',
      )
      .required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (formData) => {
        createUserMutation.mutate({ input: formData });
      },
    });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box padding={4}>
        <Typography
          sx={{ marginBottom: 2, textAlign: 'center' }}
          variant="h5"
          component="div"
        >
          <BrandLogo size={60} />
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
        </Typography>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            onChange={handleChange}
            value={values.email}
            {...(!!(errors.email && touched.email) && {
              error: true,
              helperText: errors.email,
            })}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            required
            label="Username"
            name="username"
            onChange={handleChange}
            value={values.username}
            {...(!!(errors.username && touched.username) && {
              error: true,
              helperText: errors.username,
            })}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            {...(!!(errors.password && touched.password) && {
              error: true,
              helperText: errors.password,
            })}
          />
        </Box>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          fullWidth
        >
          Create User
        </LoadingButton>
      </Box>
    </form>
  );
}

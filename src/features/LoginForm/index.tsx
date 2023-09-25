import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import BrandLogo from '@/components/BrandLogo';
import { loginUser } from '@/api';

export default function LoginForm() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit: () => {},
    });

  useQuery(['loginUser'], () => loginUser(values), {
    enabled: isSubmitting && !!values.username && !!values.password,
    onSuccess: () => {
      router.push('/account/dashboard');
    },
    onError: () => {
      setLoginError('Invalid login credentials');
    },
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box padding={4}>
        <Box textAlign="center" marginBottom={2}>
          <BrandLogo size={70} />
          <Typography component="h1" variant="h5">
            BudgetBuddy
          </Typography>
        </Box>
        {loginError && (
          <Alert variant="outlined" severity="error">
            {loginError}
          </Alert>
        )}
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
            autoComplete="no"
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
        <Box marginBottom={2}>
          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            loading={isSubmitting}
            fullWidth
          >
            Log In
          </LoadingButton>
        </Box>
        <Button
          size="large"
          color="info"
          href="/recover-password"
          component={Link}
          fullWidth
        >
          Forgot your Password?
        </Button>
        <Button
          size="large"
          color="info"
          href="/register"
          component={Link}
          fullWidth
        >
          Create an Account
        </Button>
      </Box>
    </form>
  );
}

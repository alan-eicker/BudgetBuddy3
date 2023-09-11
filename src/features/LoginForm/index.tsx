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
import { AuthenticateUserQuery } from '@/graphql/generated/graphql';
import { authenticateUser } from '@/api';

const LoginForm = (): JSX.Element => {
  const router = useRouter();

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

  const { data } = useQuery<AuthenticateUserQuery>(
    ['authenticateUser'],
    () => authenticateUser(values),
    {
      enabled: isSubmitting && !!values.username && !!values.password,
      onSuccess: (data) => {
        if (data.status.code === 200) {
          router.push('/account/dashboard');
        }
      },
    },
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box textAlign="center">
        <BrandLogo size={70} />
        <Typography component="h1" variant="h5">
          BudgetBuddy
        </Typography>
      </Box>
      {data && data?.status.code !== 200 && (
        <Alert variant="outlined" severity="error">
          {data?.status.message}
        </Alert>
      )}
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
      <Box textAlign="center">
        <Box marginBottom={1}>
          <Button
            size="small"
            color="info"
            href="/recover-password"
            component={Link}
          >
            Forgot your Password?
          </Button>
        </Box>
        <Box>
          <Button size="small" color="info" href="/register" component={Link}>
            Create an Account
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;

import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import BrandLogo from '@/components/BrandLogo';
import { useAuth } from '@/shared/hooks/useAuth';

const LoginForm = (): JSX.Element => {
  const { loading, loginError, form } = useAuth();
  const { values, errors, touched, handleChange, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Typography component="div" textAlign="center">
        <BrandLogo size={70} />
        <Typography component="h1" variant="h5" fontWeight={600}>
          BudgetBuddy
        </Typography>
      </Typography>
      {loginError && (
        <Alert variant="outlined" severity="error">
          Invalid user credentials
        </Alert>
      )}
      <TextField
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
        loading={loading}
      >
        Log In
      </LoadingButton>
      <Typography component="div" textAlign="center">
        <p>
          <Button
            size="small"
            color="info"
            href="/account/reset-password"
            component={Link}
          >
            Forgot your Password?
          </Button>
        </p>
        <p>
          <Button
            size="small"
            color="info"
            href="/account/register"
            component={Link}
          >
            Create an Account
          </Button>
        </p>
      </Typography>
    </form>
  );
};

export default LoginForm;

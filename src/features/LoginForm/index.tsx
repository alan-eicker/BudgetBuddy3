import Link from 'next/link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import BrandLogo from '@/components/BrandLogo';
import useLoginForm from './useLoginForm';

export default function LoginForm() {
  const { form, loginError } = useLoginForm();
  const { values, errors, touched, handleSubmit, handleChange, isSubmitting } =
    form;

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

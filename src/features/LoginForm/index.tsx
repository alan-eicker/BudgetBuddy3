import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import BrandLogo from '@/components/BrandLogo';
import ContentSection from '@/components/ContentSection';

import { useAuth } from '@/hooks/useAuth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './LoginForm.module.scss';

const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const { authError, login } = useAuth();
  const [isloading, setIsLoading] = useState(false);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  });

  const { errors, touched, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: () => {
      setIsLoading(true);
      login();
    },
  });
  return (
    <ContentSection maxWidth={500}>
      <form
        className={styles.loginFormContainer}
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <BrandLogo size={70} />
          <h1 className={styles.loginFormHeading}>BudgetBuddy</h1>
        </div>
        {authError && (
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
          loading={isloading}
        >
          Log In
        </LoadingButton>
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
      </form>
    </ContentSection>
  );
};

export default LoginForm;

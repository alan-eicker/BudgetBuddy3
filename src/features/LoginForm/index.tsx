import Link from 'next/link';
import TextField from '@mui/material/TextField';
import styles from './LoginForm.module.scss';
import Button from '@mui/material/Button';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginForm = (): JSX.Element => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  });

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <div className={styles.LoginFormContainer}>
      <div>
        <h1 className={styles.LoginFormHeading}>
          Budget
          <SavingsOutlinedIcon color="success" />
          Buddy
        </h1>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            required
            label="Username"
            name="username"
            onChange={handleChange}
            value={values.username}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            required
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            size="large"
          >
            Submit
          </Button>
        </form>
        <p>
          <Button
            size="small"
            color="info"
            href="/account/register"
            component={Link}
          >
            Forgot your Password?
          </Button>
        </p>
        <p>
          <Button
            size="small"
            color="info"
            href="/account/reset-password"
            component={Link}
          >
            Create an Account
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

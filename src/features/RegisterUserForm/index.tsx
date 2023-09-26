import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import BrandLogo from '@/components/BrandLogo';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useAppContext } from '@/providers/AppProvider';
import { createUser, loginUser, queryClient } from '@/api';

export default function RegisterUserForm() {
  const router = useRouter();
  const { setAppAlert } = useAppContext();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      try {
        await queryClient.fetchQuery({
          queryKey: 'loginUser',
          queryFn: () =>
            loginUser({
              username: values.username,
              password: values.password,
            }),
        });

        router.push('/account/dashboard');
      } catch (err: any) {
        router.push('/');
      }
    },
    onError: (error: any) => {
      setSubmitting(false);
      setAppAlert({
        type: 'error',
        message: error.response.errors
          .map(({ message }: { message: string }) => message)
          .join(', '),
      });
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

  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
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
            autoComplete="off"
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
            autoComplete="off"
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
        <Box marginTop={4}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            fullWidth
          >
            Create User
          </LoadingButton>
          <Box marginBottom={1.5} />
          <Button
            onClick={() => router.push('/')}
            size="large"
            variant="outlined"
            fullWidth
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
}

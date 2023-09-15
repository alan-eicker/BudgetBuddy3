import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppContext } from '@/providers/AppProvider';

export const useAuth = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const { setShowOverlay } = useAppContext();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  });

  const form = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: () => {},
  });

  const login = () => {
    setTimeout(() => {
      // if successful login
      router.push('/account/dashboard');
      // else call setLoginError(error)
      // ...
    }, 1500);
  };

  const logout = () => {
    setShowOverlay(true);
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return { loginError, form, logout };
};

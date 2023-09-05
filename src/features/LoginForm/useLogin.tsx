import { useState } from 'react';
import { useRouter } from 'next/router';
import { useOverlayContext } from '@/providers/OverlayProvider';

export const useLogin = () => {
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const { setShowOverlay } = useOverlayContext();

  const login = () => {
    setTimeout(() => {
      router.push('/account/dashboard');
    }, 1500);
  };

  const logout = () => {
    setShowOverlay(true);
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return { loginError, login, logout };
};

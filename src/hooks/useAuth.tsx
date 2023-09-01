import { useState } from 'react';
import { useRouter } from 'next/router';
import { useOverlayContext } from '@/providers/OverlayProvider';

export const useAuth = () => {
  const [authError, setAuthError] = useState(false);
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

  return { authError, login, logout };
};

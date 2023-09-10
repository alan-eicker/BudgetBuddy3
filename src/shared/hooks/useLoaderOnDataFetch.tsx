import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useOverlayContext } from '@/providers/OverlayProvider';

export const useLoaderOnDataFetch = (data: any) => {
  const router = useRouter();
  const { setShowOverlay } = useOverlayContext();

  useEffect(() => {
    setShowOverlay(!data);

    if (!data) {
      router.push('/account/dashboard');
    }
  }, [data, setShowOverlay, router]);
};

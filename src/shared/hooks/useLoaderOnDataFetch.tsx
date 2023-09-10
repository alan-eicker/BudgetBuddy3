import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useOverlayContext } from '@/providers/OverlayProvider';

export const useLoaderOnDataFetch = (data: any, fallbackUrl?: string) => {
  const router = useRouter();
  const { setShowOverlay } = useOverlayContext();

  useEffect(() => {
    setShowOverlay(!data);

    if (!data && fallbackUrl) {
      router.push(fallbackUrl);
    }
  }, [data, fallbackUrl, setShowOverlay, router]);
};

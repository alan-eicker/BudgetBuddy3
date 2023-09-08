import { useEffect } from 'react';
import { useOverlayContext } from '@/providers/OverlayProvider';

export const useLoaderOnDataFetch = (data: any) => {
  const { setShowOverlay } = useOverlayContext();

  useEffect(() => {
    setShowOverlay(!data);
  }, [data, setShowOverlay]);
};

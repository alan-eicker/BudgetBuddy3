import { useEffect } from 'react';
import { useOverlayContext } from '@/providers/OverlayProvider';

export const usePageDataStateHandler = (data: any) => {
  const { setShowOverlay } = useOverlayContext();

  useEffect(() => {
    setShowOverlay(!data);
  }, [data, setShowOverlay]);
};

import {
  useContext,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { usePreviousRoute } from '@/hooks/usePreviousRoute';

interface OverlayContext {
  showOverlay: boolean;
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
}

const OverlayContext = createContext<OverlayContext>({
  showOverlay: false,
  setShowOverlay: () => {},
});

export const useOverlayContext = () => useContext(OverlayContext);

const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const prevoiusRoute = usePreviousRoute();
  const { pathname } = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (pathname !== prevoiusRoute) {
      setShowOverlay(false);
    }
  }, [pathname, prevoiusRoute]);

  return (
    <OverlayContext.Provider value={{ showOverlay, setShowOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;

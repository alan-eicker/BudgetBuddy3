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
  const { pathname, ...router } = useRouter();
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    setShowOverlay(false);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setShowOverlay(true);
    });

    router.events.on('routeChangeComplete', () => {
      setShowOverlay(false);
    });
  }, [router]);

  return (
    <OverlayContext.Provider value={{ showOverlay, setShowOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;

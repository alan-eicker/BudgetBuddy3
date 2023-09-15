import { Dispatch, SetStateAction, useState } from 'react';
import { useContext, createContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AppContext {
  showOverlay: boolean;
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContext>({} as AppContext);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { pathname, ...router } = useRouter();

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
    <AppContext.Provider value={{ showOverlay, setShowOverlay }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

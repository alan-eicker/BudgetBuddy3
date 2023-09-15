import { useReducer } from 'react';
import { useContext, createContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  appReducer,
  initialState,
  actionCreators,
  State,
  PayloadType,
  ActionCreators,
} from '../store';

interface AppContext {
  state: State;
  actions: {
    [key: string]: (payload: PayloadType) => void;
  };
}

const AppContext = createContext<AppContext>({} as AppContext);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { pathname, ...router } = useRouter();

  const actions = Object.fromEntries(
    Object.entries(actionCreators).map(([name, action]) => {
      return [name, (payload: PayloadType) => dispatch(action(payload))];
    }),
  );

  useEffect(() => {
    actions.showOverlay(false);
  }, [actions]);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      actions.showOverlay(true);
    });

    router.events.on('routeChangeComplete', () => {
      actions.showOverlay(false);
    });
  }, [router, actions]);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

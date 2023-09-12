import { useReducer } from 'react';
import {
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import {
  appReducer,
  initialState,
  actionCreators as actions,
  Action,
  State,
} from '../store';

interface AppContext {
  state: State;
  dispatch: Dispatch<Action>;
}

const AppContext = createContext<AppContext>({
  state: {
    showOverlay: false,
    expenseToEdit: false,
  },
  dispatch: () => {},
});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { pathname, ...router } = useRouter();

  useEffect(() => {
    dispatch(actions.showOverlay(false));
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      dispatch(actions.showOverlay(true));
    });

    router.events.on('routeChangeComplete', () => {
      dispatch(actions.showOverlay(false));
    });
  }, [router]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

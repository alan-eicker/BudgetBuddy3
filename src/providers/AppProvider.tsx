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
  State,
  actionCreators,
  Action,
} from '../store';

interface AppContext {
  state: State;
  dispatch: Dispatch<Action>;
}

const AppContext = createContext<AppContext>({
  state: {
    showOverlay: false,
  },
  dispatch: () => {},
});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { pathname, ...router } = useRouter();

  const _actions = Object.fromEntries(
    Object.entries(actionCreators).map(([name, action]) => {
      return [name, (payload: Action) => dispatch(action(payload))];
    }),
  );

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

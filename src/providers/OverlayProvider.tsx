import {
  useContext,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

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
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <OverlayContext.Provider value={{ showOverlay, setShowOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;

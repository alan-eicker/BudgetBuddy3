import classnames from 'classnames';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useOverlayContext } from '@/providers/OverlayProvider';

export interface LayoutProps {
  header: JSX.Element;
  children: JSX.Element;
  showHeader?: boolean;
}

const Layout = ({
  header,
  children,
  showHeader = false,
}: LayoutProps): JSX.Element => {
  const { showOverlay } = useOverlayContext();
  const hasHeader = showHeader && header;

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showOverlay}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="layout">
        {hasHeader && header}
        <main
          className={classnames('layout__main', {
            ['has-header']: hasHeader,
          })}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;

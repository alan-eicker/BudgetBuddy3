import classnames from 'classnames';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useOverlayContext } from '@/providers/OverlayProvider';
import styles from './Layout.module.scss';

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
      <div className={styles.layoutContainer}>
        {hasHeader && header}
        <main
          className={classnames(styles.layoutMain, {
            [styles.hasHeader]: hasHeader,
          })}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;

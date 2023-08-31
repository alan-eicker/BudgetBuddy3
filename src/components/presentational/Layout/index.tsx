import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useOverlayContext } from '../../../providers/OverlayProvider';
import styles from './Layout.module.scss';
import classnames from 'classnames';

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

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showOverlay}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={styles.layoutContainer}>
        {showHeader && header && header}
        <main
          className={classnames(styles.layoutMain, {
            [styles.hasHeader]: showHeader,
          })}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;

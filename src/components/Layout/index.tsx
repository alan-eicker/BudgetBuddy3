import classnames from 'classnames';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from '@/providers/AppProvider';
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
  const { showOverlay } = useAppContext();
  const hasHeader = showHeader && header;

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showOverlay}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box className={styles.container}>
        {hasHeader && header}
        <Box
          component="main"
          className={classnames(styles.main, {
            [styles.hasHeader]: hasHeader,
          })}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;

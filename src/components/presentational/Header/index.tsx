import { ReactNode } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BrandLogo from '../BrandLogo';
import styles from './Header.module.scss';

export interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header = ({ children, title }: HeaderProps): JSX.Element => {
  return (
    <div className={styles.headerContainer}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={styles.headerLogoContainer}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <BrandLogo size={30} />
            <Link href="/">{title}</Link>
          </Typography>
          <div className={styles.headerNavContainer}>{children}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

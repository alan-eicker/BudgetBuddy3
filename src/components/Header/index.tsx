import { ReactNode } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BrandLogo from '../BrandLogo';
import styles from './Header.module.scss';

export interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header = ({ children, title }: HeaderProps): JSX.Element => (
  <Box className={styles.header}>
    <AppBar position="static">
      <Toolbar>
        <Typography
          display="flex"
          alignItems="center"
          flexGrow={1}
          component="div"
        >
          <Link href="/" className={styles.link}>
            <BrandLogo size={30} />
            <Typography component="span" variant="h6">
              {title}
            </Typography>
          </Link>
        </Typography>
        <Box className={styles.nav}>{children}</Box>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Header;

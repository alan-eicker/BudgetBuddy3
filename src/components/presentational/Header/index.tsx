import { ReactNode } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BrandLogo from '../BrandLogo';

export interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header = ({ children, title }: HeaderProps): JSX.Element => (
  <div className="header">
    <AppBar position="static">
      <Toolbar>
        <Typography className="header__logo" variant="h6" component="div">
          <Link href="/" className="header__logo__link">
            <BrandLogo size={30} />
            <span>{title}</span>
          </Link>
        </Typography>
        <div className="header__nav">{children}</div>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;

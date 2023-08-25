import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import BrandLogo from '../BrandLogo';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styles from './Header.module.scss';

export interface HeaderProps {
  title: string;
  date?: string;
}

const Header = ({
  title,
  date = new Date().toDateString(),
}: HeaderProps): JSX.Element => {
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
          <time dateTime={date}>{date}</time>
          <Button color="inherit" title="User Profile">
            <AccountCircleOutlinedIcon />
          </Button>
          <Button color="inherit" title="Log Out">
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

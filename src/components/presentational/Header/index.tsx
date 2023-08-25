import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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

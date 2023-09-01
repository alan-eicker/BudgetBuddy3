import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/presentational/Header';
import DropdownMenu from '@/components/presentational/DropdownMenu';

const AppHeader = () => {
  const { logout } = useAuth();
  const date = new Date().toDateString();

  return (
    <Header title="BudgetBuddy">
      <time dateTime={date}>{date}</time>
      <DropdownMenu
        triggerButtonText={<AccountCircleOutlinedIcon />}
        menuItems={[
          { url: '/account/profile', text: 'My Profile', icon: <PersonIcon /> },
          {
            onClick: logout,
            text: 'Log Out',
            icon: <LogoutIcon />,
          },
        ]}
      />
    </Header>
  );
};

export default AppHeader;

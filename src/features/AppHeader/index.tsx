import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAuth } from '@/shared/hooks/useAuth';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';

const AppHeader = () => {
  const { logout } = useAuth();
  const date = new Date().toDateString();

  return (
    <Header title="BudgetBuddy">
      <time style={{ fontSize: 14 }} dateTime={date}>
        {date}
      </time>
      <DropdownMenu
        triggerButtonText={<AccountCircleOutlinedIcon />}
        ariaLabel="my account button"
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

import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import { logoutUser } from '@/api';
import { useState } from 'react';

const AppHeader = () => {
  const router = useRouter();
  const [initLogout, setInitLogout] = useState(false);
  const date = new Date().toDateString();

  useQuery(['logoutUser'], () => logoutUser(), {
    enabled: initLogout,
    onSuccess: (data) => {
      if (data.isLoggedOut) {
        router.push('/');
      }
    },
  });

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
            onClick: () => setInitLogout(true),
            text: 'Log Out',
            icon: <LogoutIcon />,
          },
        ]}
      />
    </Header>
  );
};

export default AppHeader;

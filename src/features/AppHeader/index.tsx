import { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import { queryClient, logoutUser } from '@/api';
import { LogoutUserQuery } from '@/graphql/generated/graphql';
import { useAppContext } from '@/providers/AppProvider';

const AppHeader = () => {
  const router = useRouter();
  const { setShowOverlay } = useAppContext();
  const date = new Date().toDateString();

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    setShowOverlay(true);

    const { isLoggedOut } = await queryClient.fetchQuery<LogoutUserQuery>(
      ['logoutUser'],
      () => logoutUser(),
    );

    if (isLoggedOut) {
      router.push('/');
    }
  };

  return (
    <Header title="BudgetBuddy">
      <Typography component="time" fontSize={14} dateTime={date}>
        {date}
      </Typography>
      <DropdownMenu
        triggerButtonText={<AccountCircleOutlinedIcon />}
        ariaLabel="my account button"
        menuItems={[
          {
            href: '/account/profile',
            text: 'My Profile',
            icon: <PersonIcon />,
          },
          {
            onClick: handleLogout,
            text: 'Log Out',
            icon: <LogoutIcon />,
          },
        ]}
      />
    </Header>
  );
};

export default AppHeader;

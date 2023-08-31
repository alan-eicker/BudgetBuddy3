import '@/styles/globals.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Header from '@/components/presentational/Header';
import Layout from '@/components/presentational/Layout';
import DropdownMenu from '@/components/presentational/DropdownMenu';
import { Hydrate, QueryClientProvider } from 'react-query';
import useAuth from '@/hooks/auth';
import OverlayProvider from '@/providers/OverlayProvider';
import { queryClient } from '../api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const date = new Date().toDateString();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const { logout } = useAuth();

  const showHeader = pathname !== '/' && pathname !== '/account/register';

  const header = (
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

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <OverlayProvider>
            <Layout showHeader={showHeader} header={header}>
              <Component {...pageProps} />
            </Layout>
          </OverlayProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

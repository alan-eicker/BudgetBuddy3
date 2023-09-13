import '@/styles/globals.scss';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Hydrate, QueryClientProvider } from 'react-query';
import Layout from '@/components/Layout';
import AppHeader from '@/features/AppHeader';
import AppProvider from '@/providers/AppProvider';
import ExpenseFormModalProvider from '@/providers/ExpenseFormModalContext';
import { queryClient } from '../api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const showHeader = pathname !== '/' && pathname !== '/account/register';
  const includeExpenseModalProvider =
    pathname === '/account/expense-group' ||
    pathname === '/account/add-expense-group';

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AppProvider>
            <Layout showHeader={showHeader} header={<AppHeader />}>
              {includeExpenseModalProvider ? (
                <ExpenseFormModalProvider>
                  <Component {...pageProps} />
                </ExpenseFormModalProvider>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </AppProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

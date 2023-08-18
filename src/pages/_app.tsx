import '@/styles/globals.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from 'react-query';
import Header from '@/components/presentational/Header';
import Layout from '@/components/presentational/Layout';
import { queryClient } from '../api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#fa7aa9',
      main: '#ff5794',
      dark: '#dc3b76',
      contrastText: '#000',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const header = <Header title="BudgetBuddy" />;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Layout header={header}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

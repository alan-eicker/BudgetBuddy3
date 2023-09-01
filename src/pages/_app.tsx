import '@/styles/globals.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Hydrate, QueryClientProvider } from 'react-query';
import Layout from '@/components/presentational/Layout';
import AppHeader from '@/features/AppHeader';
import OverlayProvider from '@/providers/OverlayProvider';
import { queryClient } from '../api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const showHeader = pathname !== '/' && pathname !== '/account/register';

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <OverlayProvider>
            <Layout showHeader={showHeader} header={<AppHeader />}>
              <Component {...pageProps} />
            </Layout>
          </OverlayProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

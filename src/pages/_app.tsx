import '@/styles/globals.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from 'react-query';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { queryClient } from '../api';

export default function App({ Component, pageProps }: AppProps) {
  const header = <Header title="BudgetBuddy" />;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout header={header}>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

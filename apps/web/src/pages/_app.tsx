import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { Toaster } from '@store/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { api } from '@/utils';

import '@/styles/globals.css';

import MainLayout from '@/components/layout/main-layout';

const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div suppressHydrationWarning lang="en">
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <MainLayout>
              <Component {...pageProps} />
              <Toaster />
            </MainLayout>
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));

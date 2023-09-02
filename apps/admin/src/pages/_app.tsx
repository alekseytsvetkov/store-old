import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next'
import { Toaster } from "@store/ui"

import { api } from "@/utils/api";

import "@/styles/globals.css";

import { Inter } from 'next/font/google';
import MainLayout from "@/components/layout";

const inter = Inter({ subsets: ['latin'] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div suppressHydrationWarning lang="en">
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <div className={`${inter.className} flex flex-col h-screen`}>
            <MainLayout>
              <Component {...pageProps} />
              <Toaster />
            </MainLayout>
          </div>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));

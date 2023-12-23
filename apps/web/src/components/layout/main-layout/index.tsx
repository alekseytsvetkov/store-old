import Head from 'next/head';
import { Inter } from 'next/font/google';

import type { ReactNode } from 'react';

import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

interface IMainLayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export default function MainLayout({ children }: IMainLayoutProps) {
  return (
    <div className={`${inter.className} flex flex-col`}>
      <Head>
        <title>Store</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background">
        <SiteHeader />
        <main className="flex flex-1">
          <div className="container flex w-0 flex-1 flex-col">{children}</div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

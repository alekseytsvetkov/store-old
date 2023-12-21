import Head from 'next/head';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Button } from '@store/ui';
import { SiteFooter } from './site-footer';
import { CatalogMenu, LanguageSwitcher, ModeToggle, UserNav } from '@/components';
import { Search } from '@/components/search';

interface MainLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={`${inter.className} flex flex-col`}>
      <Head>
        <title>Space</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background">
        <header className="relative w-full border-b">
          <nav className="container flex h-16 items-center px-4 text-sm font-medium text-slate-800 dark:text-slate-300">
            <div className="grid w-full md:grid-cols-3">
              <div className="flex items-center justify-start gap-2">
                <Link href="/">
                  <Button variant="link" className="px-0">
                    Store
                  </Button>
                </Link>
                <Suspense>
                  <CatalogMenu />
                </Suspense>
              </div>
              <div className="flex items-center justify-center">
                <Suspense>
                  <Search />
                </Suspense>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Link href="/">
                  <Button variant="link">Work with us</Button>
                </Link>
                <LanguageSwitcher />
                <ModeToggle />
                <UserNav />
              </div>
            </div>
          </nav>
        </header>
        <main className="flex flex-1">
          <div className="container flex w-0 flex-1 flex-col">{children}</div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Search } from './search';
import { LanguageSwitcher } from './language-switcher';
import { UserNav } from './user-nav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={`${inter.className} flex h-screen flex-col`}>
      <Head>
        <title>Space</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background h-screen">
        <header className="w-full border-b">
          <nav className="container flex h-16 items-center px-4 text-sm font-medium text-slate-800 dark:text-slate-300">
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <div className="text-sm font-medium hover:cursor-pointer">Store</div>
              </Link>
              <div className="flex items-center justify-end gap-2">
                <Suspense>
                  <Search />
                </Suspense>
                <LanguageSwitcher />
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                </div>
                <UserNav />
              </div>
            </div>
          </nav>
        </header>
        <main className="flex h-[calc(100%-65px)] flex-1">
          <div className="container flex w-0 flex-1 flex-col">{children}</div>
        </main>
      </div>
    </div>
  );
}

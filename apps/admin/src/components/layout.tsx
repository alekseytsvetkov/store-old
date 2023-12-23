import Head from 'next/head';
import { ModeToggle } from './mode-toggle';
import { Search } from './search';
import { Sidebar } from './sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { LanguageSwitcher } from './language-switcher';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background h-screen">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 text-slate-800 dark:text-slate-300">
            <Link href="/">
              <div className="text-sm font-medium hover:cursor-pointer">Admin</div>
            </Link>
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <LanguageSwitcher />
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex h-[calc(100%-65px)] flex-1">
          <Sidebar className="relative hidden w-56 lg:block" />
          <div className="flex w-0 flex-1 flex-col lg:border-l">
            <div className="grid h-full grid-cols-6 px-4 py-6 lg:px-8">
              <div className="col-span-4 col-start-2">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

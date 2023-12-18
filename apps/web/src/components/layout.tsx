import Head from "next/head";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Inter } from 'next/font/google';

interface MainLayoutProps {
  children: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] });

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={`${inter.className} flex flex-col h-screen`}>
      <Head>
        <title>Space</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background h-screen">
        <header className="border-b w-full">
          <div className="flex h-16 items-center px-4 text-slate-800 dark:text-slate-300 text-sm font-medium container">
            <Link href="/">
              <div className="text-sm font-medium hover:cursor-pointer">Store</div>
            </Link>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
            </div>
          </div>
        </header>
        <main className="flex flex-1 h-[calc(100%-65px)]">
          <div className="flex w-0 flex-1 flex-col container">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

import Head from "next/head"
import { Sidebar } from "./sidebar"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>Space</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background h-screen">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 text-slate-800 dark:text-slate-300">
            <Link href="/">
              <div className="text-sm font-medium hover:cursor-pointer">Store</div>
            </Link>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
            </div>
          </div>
        </div>
        <div className="flex flex-1 h-[calc(100%-65px)]">
        <Sidebar className="hidden lg:block relative w-56" />
        <div className="flex w-0 flex-1 flex-col lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8 grid grid-cols-6">
          <div className="col-start-2 col-span-4">
            {children}
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  )
}

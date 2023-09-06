// import { PlusCircledIcon } from "@radix-ui/react-icons"
// import { Tabs, TabsList, TabsTrigger, TabsContent, Separator, ScrollArea, ScrollBar } from "@store/ui"
// import { Button } from "react-day-picker"
import Head from "next/head"
import { MainNav } from "./main-nav"
import { ModeToggle } from "./mode-toggle"
import { Search } from "./search"
import { Sidebar } from "./sidebar"
import { UserNav } from "./user-nav"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"

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
              <div className="text-sm font-medium hover:cursor-pointer">Space</div>
            </Link>
            {/* <MainNav className="mx-6" /> */}
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <LanguageSwitcher />
              <ModeToggle />
              <UserNav />
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

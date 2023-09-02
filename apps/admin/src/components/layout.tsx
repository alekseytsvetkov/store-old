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
        <div className="h-full px-4 py-6 lg:px-8">
          {children}
          {/* <Tabs defaultValue="music" className="h-full space-y-6">
            <div className="space-between flex items-center">
              <TabsList>
                <TabsTrigger value="music" className="relative">
                  Music
                </TabsTrigger>
                <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                <TabsTrigger value="live" disabled>
                  Live
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto mr-4">
                <Button>
                  <PlusCircledIcon className="mr-2 h-4 w-4" />
                  Add music
                </Button>
              </div>
            </div>
            <TabsContent
              value="music"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Listen Now
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Top picks for you. Updated daily.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">

                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
              <div className="mt-6 space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Made for You
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your personal playlists. Updated daily.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">

                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent
              value="podcasts"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    New Episodes
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your favorite podcasts. Updated daily.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <PodcastEmptyPlaceholder />
            </TabsContent>
          </Tabs> */}
        </div>
        </div>
        </div>
      </div>
    </>
  )
}

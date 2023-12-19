
import Head from "next/head";

import { api } from "@/utils/api";
import { signIn, signOut, useSession } from "@store/auth/react";
import { Button, ScrollArea, ScrollBar, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@store/ui";
import Image from 'next/image'

export default function Home() {
  const hello = api.auth.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Store</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center py-6">
        <Tabs defaultValue="recommended" className="h-full w-full">
          <div className="flex items-center justify-center">
            <TabsList>
              <TabsTrigger value="recommended" className="relative">
                Recommended
              </TabsTrigger>
              <TabsTrigger value="news-and-trending">News & Trending</TabsTrigger>
              <TabsTrigger value="top-sellers">
                Top sellsers
              </TabsTrigger>
              <TabsTrigger value="popular-upcoming">
                Popular Upcoming
              </TabsTrigger>
              <TabsTrigger value="specials">
                Specials
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="recommended"
            className="border-none p-0 outline-none"
          >
            <div className="grid md:grid-cols-6 pt-6 gap-6">
              {new Array(24).fill('').map((_, index) => (
                <div key={index} className="pb-6">
                  <Image
                    src="https://placehold.co/180x180.png"
                    alt="product image"
                    className="rounded"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="pt-2 text-sm">Product name</p>
                  <p>64</p>
                  <p>1 200 ₽</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="news-and-trending"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid md:grid-cols-6 pt-6 gap-6">
              {new Array(24).fill('').map((_, index) => (
                <div key={index} className="pb-6">
                  <Image
                    src="https://placehold.co/180x180.png"
                    alt="product image"
                    className="rounded"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="pt-2 text-sm">Product name</p>
                  <p>64</p>
                  <p>1 200 ₽</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="top-sellers"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid md:grid-cols-6 pt-6 gap-6">
              {new Array(24).fill('').map((_, index) => (
                <div key={index} className="pb-6">
                  <Image
                    src="https://placehold.co/180x180.png"
                    alt="product image"
                    className="rounded"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="pt-2 text-sm">Product name</p>
                  <p>64</p>
                  <p>1 200 ₽</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="popular-upcoming"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid md:grid-cols-6 pt-6 gap-6">
              {new Array(24).fill('').map((_, index) => (
                <div key={index} className="pb-6">
                  <Image
                    src="https://placehold.co/180x180.png"
                    alt="product image"
                    className="rounded"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="pt-2 text-sm">Product name</p>
                  <p>64</p>
                  <p>1 200 ₽</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="specials"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid md:grid-cols-6 pt-6 gap-6">
              {new Array(24).fill('').map((_, index) => (
                <div key={index} className="pb-6">
                  <Image
                    src="https://placehold.co/180x180.png"
                    alt="product image"
                    className="rounded"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="pt-2 text-sm">Product name</p>
                  <p>64</p>
                  <p>1 200 ₽</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}!</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

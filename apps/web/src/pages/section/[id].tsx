import Head from "next/head";

import { api } from "@/utils/api";

export default function Section() {

  return (
    <>
      <Head>
        <title>Section</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>Section</div>
      </main>
    </>
  );
}

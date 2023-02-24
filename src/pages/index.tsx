import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Four of a Kind</title>
        <meta name="description" content="a fun tracker for chinese poker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-800">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold uppercase tracking-tight">
              FOUR OF A KIND
            </h1>
            <p className="text-sm font-light lowercase tracking-wide">
              a fun tracker for chinese poker
            </p>
          </div>

          <div className="flex flex-col items-stretch">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Room ID" />
              <Button type="submit">Join</Button>
            </div>
            <div className="justify-stretch flex flex-row items-center px-4">
              <div className="flex-grow border-b border-solid border-slate-200" />
              <span className="my-4 px-4 text-sm text-slate-200">OR</span>
              <div className="flex-grow border-b border-solid border-slate-200" />
            </div>
            <div className="grid place-items-center">
              <Button type="submit">Create a new room</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

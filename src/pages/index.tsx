import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const router = useRouter();

  const [userInputRoomName, setUserInputRoomName] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);

  const trpcUtils = api.useContext();

  const createRoom = api.room.createRoom.useMutation({
    onSuccess: async (room) => {
      try {
        await router.push(`/room/${room.name}`);
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function joinRoom(roomName: string) {
    setIsJoiningRoom(true);
    if (roomName == "") {
      setShowError(true);
      return;
    }

    // First check if room name exists
    try {
      const room = await trpcUtils.room.getRoom.fetch({ roomName: roomName });
      if (room) {
        await router.push(`/room/${roomName}`);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setIsJoiningRoom(false);
    }
  }

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
            <div className="flex w-full max-w-sm flex-col gap-y-1">
              <div
                className={clsx(
                  "text-xs text-red-400",
                  showError ? "opacity-100" : "opacity-0"
                )}
              >
                Room name not found!
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Room Name"
                  value={userInputRoomName}
                  onChange={(event) => {
                    setUserInputRoomName(event.target.value);
                    setShowError(false);
                  }}
                />
                <Button
                  type="submit"
                  onClick={async () => {
                    try {
                      await joinRoom(userInputRoomName);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  disabled={isJoiningRoom}
                  className="w-20"
                >
                  {isJoiningRoom ? (
                    <div
                      className="h-4 w-4 animate-spin rounded-full
          border-2 border-solid border-slate-800 border-t-transparent"
                    />
                  ) : (
                    "Join"
                  )}
                </Button>
              </div>
            </div>

            <div className="justify-stretch flex flex-row items-center px-4">
              <div className="flex-grow border-b border-solid border-slate-200" />
              <span className="my-4 px-4 text-sm text-slate-200">OR</span>
              <div className="flex-grow border-b border-solid border-slate-200" />
            </div>
            <div className="grid place-items-center">
              <Button
                type="submit"
                disabled={createRoom.isLoading}
                onClick={() => {
                  createRoom.mutate();
                }}
              >
                {createRoom.isLoading ? (
                  <div
                    className="h-4 w-4 animate-spin rounded-full
          border-2 border-solid border-slate-800 border-t-transparent"
                  />
                ) : (
                  "Create a new room"
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

import { HistoryIcon, Menu, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import ColouredBox from "~/components/ColouredBox";
import HistoryRow from "~/components/HistoryRow";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/utils/api";

export default function Room() {
  const router = useRouter();

  const roomName = router.query.name as string;
  const roomData = api.room.getRoom.useQuery(
    { roomName: roomName },
    {
      refetchOnWindowFocus: false,
    }
  );

  const [redScore, setRedScore] = useState(0);
  const [greenScore, setGreenScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [yellowScore, setYellowScore] = useState(0);

  const [isMutating, setIsMutating] = useState(false);

  const trpcUtils = api.useContext();
  const addHistoryRecord = api.room.addHistoryRecord.useMutation({
    onSuccess: async () => {
      try {
        await trpcUtils.room.getRoom.invalidate({ roomName: roomName });
        setRedScore(0);
        setGreenScore(0);
        setBlueScore(0);
        setYellowScore(0);
      } catch (error) {
        console.log(error);
      }
    },
    onMutate: () => {
      setIsMutating(true);
    },
    onSettled: () => {
      setIsMutating(false);
    },
  });

  const undoLastHistoryRecord = api.room.undoLastHistoryRecord.useMutation({
    onSuccess: async () => {
      try {
        await trpcUtils.room.getRoom.invalidate({ roomName: roomName });
      } catch (error) {
        console.log(error);
      }
    },
    onMutate: () => {
      setIsMutating(true);
    },
    onSettled: () => {
      setIsMutating(false);
    },
  });

  // Memoised value of each player's total score based on roomData.data.history
  const totalScores = useMemo(() => {
    if (roomData.data) {
      const { history } = roomData.data;
      const totalScores = {
        red: 0,
        green: 0,
        blue: 0,
        yellow: 0,
      };

      history.forEach((record) => {
        totalScores.red += record.redScore;
        totalScores.green += record.greenScore;
        totalScores.blue += record.blueScore;
        totalScores.yellow += record.yellowScore;
      });

      return totalScores;
    }
  }, [roomData]);

  return (
    <div className="flex h-screen w-full flex-col px-4">
      <header className="">
        <div className="container flex h-16 flex-row items-center justify-between">
          <h1>FOUR OF A KIND</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex flex-col text-slate-500">
                  <div className="tracking-widee text-[8px] uppercase leading-3 text-slate-500">
                    Room name
                  </div>
                  <div>{roomData.data?.name}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-row items-center gap-2">
                  <Send size={16} />
                  <div>Send Feedback</div>
                </div>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <div className="flex flex-row items-center gap-2">
                  <RefreshCcw size={16} /> Reset Game
                </div>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {roomData.isLoading ? (
        <div className="grid h-40 place-items-center">
          <div
            className="h-12 w-12 animate-spin rounded-full
          border-2 border-solid border-slate-200 border-t-transparent"
          />
        </div>
      ) : !roomData || !roomData.data || roomData.error ? (
        <div className="flex h-40 flex-col items-center justify-center gap-4">
          <div className="text-center text-sm text-slate-100">
            This room ID does not exist. You might want to check the ID or
            create a new room!
          </div>
          <Button>
            <Link href="/">Home</Link>
          </Button>
        </div>
      ) : (
        <>
          <main className="flex flex-1 flex-col items-stretch gap-y-2">
            <section className="rounded-lg bg-gradient-to-b from-[#F1F5F94D] to-[#F1F5F933] py-2 px-4">
              <div className="grid grid-cols-12 place-items-center gap-y-2 text-lg">
                <div className="col-start-2 col-end-4 justify-self-end text-xs font-medium">
                  PLAYER
                </div>
                <div className="col-span-2 col-start-5 aspect-square w-5 rounded-full bg-yellow-200" />
                <div className="col-span-2 aspect-square w-5 rounded-full bg-blue-400" />
                <div className="col-span-2 aspect-square w-5 rounded-full bg-red-400" />
                <div className="col-span-2 aspect-square w-5 rounded-full bg-green-300" />

                <div className="col-start-2 col-end-4 justify-self-end text-xs font-medium">
                  SUBTOTAL
                </div>
                <div className="col-span-2 col-start-5">
                  {totalScores?.yellow}
                </div>
                <div className="col-span-2">{totalScores?.blue}</div>
                <div className="col-span-2">{totalScores?.red}</div>
                <div className="col-span-2">{totalScores?.green}</div>
              </div>
            </section>

            <section className="h-20 w-full overflow-y-auto px-4">
              {roomData.data.history.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                  <HistoryIcon />
                  <div className="text-center text-xs">
                    No history yet. Start playing!
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-y-3 text-slate-400">
                {roomData.data.history?.map((record, index, records) => {
                  const scores = {
                    redScore: record.redScore,
                    greenScore: record.greenScore,
                    blueScore: record.blueScore,
                    yellowScore: record.yellowScore,
                  };

                  return (
                    <HistoryRow
                      key={index}
                      round={records.length - index}
                      scores={scores}
                    />
                  );
                })}
              </div>
            </section>

            <section className="flex flex-1 flex-col items-stretch justify-center gap-y-8">
              <h2 className="text-center text-xl uppercase">
                ROUND {roomData.data.history.length + 1}
              </h2>
              <div className="grid h-60 w-full place-items-center">
                <ColouredBox
                  colour="green"
                  score={greenScore}
                  setScore={setGreenScore}
                  className="absolute translate-y-16"
                />
                <ColouredBox
                  colour="blue"
                  score={blueScore}
                  setScore={setBlueScore}
                  className="absolute -translate-y-16"
                />
                <ColouredBox
                  colour="red"
                  score={redScore}
                  setScore={setRedScore}
                  className="absolute translate-x-16"
                />
                <ColouredBox
                  colour="yellow"
                  score={yellowScore}
                  setScore={setYellowScore}
                  className="absolute -translate-x-16"
                />
              </div>
            </section>
          </main>
          <footer className="z-40 w-full flex-grow-0">
            <div className="container flex h-16 flex-row items-center justify-between">
              <Button
                className="w-32"
                onClick={() => {
                  if (roomData.data?.id) {
                    undoLastHistoryRecord.mutate({
                      roomID: roomData.data.id,
                    });
                  }
                }}
              >
                {isMutating ? (
                  <div
                    className="h-4 w-4 animate-spin rounded-full
          border-2 border-solid border-slate-800 border-t-transparent"
                  />
                ) : (
                  "Undo Round"
                )}
              </Button>
              <Button
                className="w-32"
                onClick={() => {
                  if (roomData.data?.id) {
                    addHistoryRecord.mutate({
                      roomID: roomData.data.id,
                      scores: {
                        yellowScore,
                        blueScore,
                        redScore,
                        greenScore,
                      },
                    });
                  }
                }}
              >
                {isMutating ? (
                  <div
                    className="h-4 w-4 animate-spin rounded-full
          border-2 border-solid border-slate-800 border-t-transparent"
                  />
                ) : (
                  "Next Round"
                )}
              </Button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

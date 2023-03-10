import { History, HistoryIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ColouredBox from "~/components/ColouredBox";
import HistoryRow from "~/components/HistoryRow";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export default function Room() {
  const router = useRouter();

  const id = router.query.id as string;
  const roomData = api.room.getRoom.useQuery(
    { roomID: +id },
    {
      refetchOnWindowFocus: false,
    }
  );

  const [redScore, setRedScore] = useState(0);
  const [greenScore, setGreenScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [yellowScore, setYellowScore] = useState(0);

  return (
    <div className="flex min-h-screen flex-col px-4">
      <header className="sticky top-0 z-40 w-full">
        <div className="container flex h-16 flex-row items-center justify-between">
          <h1>Four of a Kind</h1>
          Menu
        </div>
      </header>
      {roomData.isLoading ? (
        <div className="grid h-40 place-items-center">
          <div
            className="h-12 w-12 animate-spin rounded-full
          border-2 border-solid border-slate-200 border-t-transparent"
          />
        </div>
      ) : roomData.error ? (
        <div className="flex h-40 flex-col items-center justify-center gap-4">
          <div className="text-center text-sm text-slate-100">
            This room ID doesn't exist. You might want to check the ID or create
            a new room!
          </div>
          <Button>
            <Link href="/">Home</Link>
          </Button>
        </div>
      ) : (
        <>
          <main className="flex flex-1 flex-col items-stretch gap-y-4">
            <section className="rounded-lg bg-gradient-to-b from-[#F1F5F94D] to-[#F1F5F933] py-4 px-4">
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
                <div className="col-span-2 col-start-5">4</div>
                <div className="col-span-2">3</div>
                <div className="col-span-2">2</div>
                <div className="col-span-2">1</div>
              </div>
            </section>

            <section className="h-24 w-full overflow-y-auto px-4">
              {roomData.data.history.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                  <HistoryIcon />
                  <div className="text-center text-xs">
                    No history yet. Start playing!
                  </div>
                </div>
              )}
              {roomData.data.history?.map((record, index) => {
                const scores = {
                  redScore: record.redScore,
                  greenScore: record.greenScore,
                  blueScore: record.blueScore,
                  yellowScore: record.yellowScore,
                };

                return (
                  <HistoryRow
                    key={index}
                    round={record.round}
                    scores={scores}
                  />
                );
              })}
            </section>

            <section className="flex flex-col items-stretch gap-y-2">
              <h2 className="text-center text-xl uppercase">
                ROUND {roomData.data.history.length + 1}
              </h2>
              <div className="relative grid aspect-square w-full place-items-center">
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
              <Button>Undo</Button>
              <Button>Next</Button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

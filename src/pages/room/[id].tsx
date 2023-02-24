import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div className="flex min-h-screen flex-col px-4">
      <header className="sticky top-0 z-40 w-full">
        <div className="container flex h-16 flex-row items-center justify-between">
          <h1>Four of a Kind</h1>
          Menu
        </div>
      </header>
      <main className="flex flex-col items-center">
        <div>Room ID: {id}</div>
        <div className="rounded-lg bg-gradient-to-b from-[#F1F5F94D] to-[#F1F5F933] py-4 px-8">
          <div className="grid grid-cols-11 place-items-center gap-y-4 text-lg backdrop-opacity-30 ">
            <div className="col-start-1 col-end-3 justify-self-end text-xs font-medium">
              PLAYER
            </div>
            <div className="col-span-2 col-start-4 aspect-square w-5  rounded-full bg-yellow-300" />
            <div className="col-span-2 aspect-square w-5 rounded-full bg-blue-400" />
            <div className="col-span-2 aspect-square w-5 rounded-full bg-red-400" />
            <div className="col-span-2 aspect-square w-5 rounded-full bg-green-300" />
            <div className="col-start-1 col-end-3 justify-self-end text-xs font-medium">
              SUBTOTAL
            </div>
            <div className="col-span-2 col-start-4">4</div>
            <div className="col-span-2">3</div>
            <div className="col-span-2">2</div>
            <div className="col-span-2">1</div>
          </div>
        </div>
      </main>
    </div>
  );
}

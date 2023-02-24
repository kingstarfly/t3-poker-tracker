import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-800">
      <div>Room ID: {id}</div>
    </main>
  );
}

import clsx from 'clsx';
import { Minus, MinusCircle, MinusSquare, Plus } from "lucide-react";
import React from "react";

type ColouredBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  colour: "red" | "green" | "blue" | "yellow";
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const colourMap = {
  red: "bg-red-400",
  green: "bg-green-300",
  blue: "bg-blue-400",
  yellow: "bg-yellow-200",
};

const ColouredBox = ({
  colour,
  className,
  score,
  setScore,
}: ColouredBoxProps) => {
  return (
    <div className={clsx(className, "grid w-12 place-items-center")}>
      <div
        className={clsx(
          "absolute flex items-center justify-center gap-1 text-center",

          {
            "w-full translate-y-[165%] flex-row": colour === "green",
            "w-full -translate-y-[165%] flex-row": colour === "blue",
            "h-full translate-x-[165%] flex-col-reverse": colour === "red",
            "h-full -translate-x-[165%] flex-col-reverse": colour === "yellow",
          }
        )}
      >
        <button
          className="text-slate-400"
          role="button"
          onClick={() => {
            setScore(score - 1);
          }}
        >
          <Minus />
        </button>
        <div className="w-7 text-center text-xl">{score}</div>
        <button
          className="text-slate-400"
          role="button"
          onClick={() => setScore(score + 1)}
        >
          <Plus />
        </button>
      </div>

      <div
        className={clsx(colourMap[colour], "aspect-square w-full rounded-md")}
      />
    </div>
  );
};

export default ColouredBox;

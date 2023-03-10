import clsx from "clsx";
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
          "absolute flex w-full flex-row items-center justify-center text-center",

          {
            "translate-y-[165%]": colour === "green",
            "-translate-y-[165%]": colour === "blue",
            "translate-x-[115%]": colour === "red",
            "-translate-x-[115%]": colour === "yellow",
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
          -
        </button>
        <div className="w-7 text-center">{score}</div>
        <button
          className="text-slate-400"
          role="button"
          onClick={() => setScore(score + 1)}
        >
          +
        </button>
      </div>

      <div
        className={clsx(colourMap[colour], "aspect-square w-full rounded-md")}
      />
    </div>
  );
};

export default ColouredBox;

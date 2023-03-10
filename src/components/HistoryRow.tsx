import clsx from "clsx";
import React from "react";

type HistoryRowProps = {
  scores: {
    redScore: number;
    greenScore: number;
    blueScore: number;
    yellowScore: number;
  };
  round: number;
};

const HistoryRow = ({ round, scores }: HistoryRowProps) => {
  return (
    <div className="grid grid-cols-12 place-items-center gap-y-2 text-xs font-normal">
      <div className="col-start-1 col-end-4 flex flex-row justify-self-end">
        ROUND <p className="w-4 text-right">{round}</p>
      </div>
      <span className="col-span-2 col-start-5">
        {displayScore(scores.yellowScore)}
      </span>
      <span className="col-span-2">{displayScore(scores.blueScore)}</span>
      <span className="col-span-2">{displayScore(scores.redScore)}</span>
      <span className="col-span-2">{displayScore(scores.greenScore)}</span>
    </div>
  );
};

export default HistoryRow;

function displayScore(score: number) {
  // Return +score if positive, -score if negative or 0 if 0.
  return score > 0 ? `+${score}` : score;
}

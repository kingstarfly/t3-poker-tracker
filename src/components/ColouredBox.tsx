import clsx from "clsx";
import React from "react";

type ColouredBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  colour: "red" | "green" | "blue" | "yellow";
};

const colourMap = {
  red: "bg-red-400",
  green: "bg-green-300",
  blue: "bg-blue-400",
  yellow: "bg-yellow-300",
};

const ColouredBox = ({ colour, className }: ColouredBoxProps) => {
  return (
    <div
      className={clsx(
        colourMap[colour],
        "aspect-square w-12 rounded-md",
        className
      )}
    />
  );
};

export default ColouredBox;

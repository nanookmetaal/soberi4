import React from "react";

type CircleProps = {
  color: "red" | "yellow" | "none";
};

const Circle: React.FC<CircleProps> = ({ color }) => {
  const colorClasses =
    color === "red"
      ? "bg-red-500"
      : color === "yellow"
      ? "bg-yellow-400"
      : "";

  return (
    <div className={`aspect-square w-12 rounded-full ${colorClasses}`} />
  );
};

export default Circle;

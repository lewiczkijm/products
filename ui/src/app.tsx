import React from "react";
import "./index.scss";
import data from "./data.json";
import kitten from "./Kitten.jpg";
export const App: React.FC = ({}) => {
  const a: string = "1234";
  return (
    <div className="app">
      <img src={kitten} />
      {data.map((el) => (
        <span>{el.name}</span>
      ))}
    </div>
  );
};

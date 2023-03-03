import { React, useContext} from "react";
import { GetScore } from "./../../App";
import { Number } from "./../number/number.component";
import "./score.styles.css";

export function Score() {
  const getScore = useContext(GetScore);

  return (
    <>
      <div className="score">
        {getScore.data.map((number, index) => {
          return <Number key={index} number={number} />;
        })}
      </div>
    </>
  );
}

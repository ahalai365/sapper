import { React, useContext} from "react";
// import { GetScore } from "./../../App";
import { Number } from "./../number/number.component";
import "./score.styles.css";

export function Score({score}) {
  return (
    <>
      <div className="score">
        {score.map((number, index) => {
          return <Number key={index} number={number} />;
        })}
      </div>
    </>
  );
}

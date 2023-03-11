import { React, createContext, useState } from "react";
import "./header.styles.css";

import { Smile } from "./../smile/smile.component";
import { Timer } from "../counter/timer.component";
import { Score } from "./../score/score.component";

export function Header({ time, setTime, isFirstClick, score, onClick, win }) {
  return (
    <div className="header">
      <Score score={score} />
      <Smile onClick={onClick} win={win}/>
      <Timer time={time} setTime={setTime} isFirstClick={isFirstClick} />
    </div>
  );
}

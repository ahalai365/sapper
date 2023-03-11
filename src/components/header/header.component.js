import { React, createContext, useState } from "react";
import "./header.styles.css";

import { Smile } from "./../smile/smile.component";
import { Timer } from "../counter/timer.component";
import { Score } from "./../score/score.component";

export function Header({ isFirstClick, score, onClick, win, loose }) {
  return (
    <div className="header">
      <Score score={score} />
      <Smile onClick={onClick} win={win} loose={loose}/>
      <Timer isFirstClick={isFirstClick} loose={loose} win={win} />
    </div>
  );
}

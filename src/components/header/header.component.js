import React from "react";
import "./header.styles.css";

import { Smile } from "./../smile/smile.component";
import { Timer } from "../timer/timer.component";
import { Score } from "./../score/score.component";

export function Header() {
  return (
    <div className="header">
      <Score />
      <Smile />
      <Timer />
    </div>
  );
}

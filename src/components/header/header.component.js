import React from "react";
import "./header.styles.css";

import { Smile } from "./../smile/smile.component";
import { Seconds } from "./../seconds/seconds.component";
import { Score } from "./../score/score.component";

export function Header() {
  return (
    <div className="header">
      <Score />
      <Smile />
      <Seconds />
    </div>
  );
}

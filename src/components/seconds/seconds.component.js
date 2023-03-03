import React from "react";
import "./seconds.styles.css";

import { Counter } from "./../counter/counter.component";

export function Seconds() {
  return (
    <Counter>
      <div className="seconds">3</div>
      <div className="seconds">2</div>
      <div className="seconds">1</div>
    </Counter>
  );
}

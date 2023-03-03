import React from "react";
import { Counter } from "../counter/counter.component";
import "./score.styles.css";

export function Score() {
  return (
    <Counter>
      <div className="score"></div>
      <div className="score"></div>
      <div className="score"></div>
    </Counter>
  );
}

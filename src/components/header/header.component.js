import {React, createContext, useState} from "react";
import "./header.styles.css";

import { Smile } from "./../smile/smile.component";
import { Timer } from "../timer/timer.component";
import { Score } from "./../score/score.component";

export const GetTimer = createContext();

export function Header() {
  const [time, setTime] = useState([0, 0, 0]);

  return (
    <div className="header">
      <GetTimer.Provider
        value={{
          data: time,
          setTime: (data) => {
            setTime(data);
          },
        }}
      >
        <Score />
        <Smile />
        <Timer />
      </GetTimer.Provider>
    </div>
  );
}

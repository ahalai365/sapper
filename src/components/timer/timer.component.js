import { React, useContext, useRef, useEffect } from "react";
import "./timer.styles.css";

import { Number } from "./../number/number.component";
import { GameIsStart, ToggleReset } from "./../../App";
import { GetTimer } from "./../header/header.component";

export function Timer() {
  const getTimer = useContext(GetTimer);
  const gameIsReset = useContext(GameIsStart);

  const intervalRef = useRef();

  useEffect(() => {
    if (!gameIsReset.data) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(
        () => timer(getTimer.data, intervalRef.current),
        1000
      );
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(
        () => timer(getTimer.data, intervalRef.current),
        1000
      );
    }
  }, [gameIsReset.data]);

  function timer(value, clock) {
    if (value[0] === 9 && value[1] === 9 && value[2] === 9) {
      clearInterval(clock);
      getTimer.setTime(
        value.map((e) => {
          return e;
        })
      );
    }

    if (value[2] < 9) {
      value[2] += 1;
    } else if (value[1] < 9) {
      value[2] = 0;
      value[1] += 1;
    } else if (value[0] < 9) {
      value[1] = 0;
      value[0] += 1;
    } else {
      value = [9, 9, 9];
    }
    getTimer.setTime(
      value.map((e) => {
        return e;
      })
    );
  }

  return (
    <>
      <div className="timer">
        {getTimer.data.map((number, index) => {
          return <Number key={index} number={number} />;
        })}
      </div>
    </>
  );
}

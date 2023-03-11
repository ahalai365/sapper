import { React, useContext, useRef, useEffect, useState } from "react";
import "./timer.styles.css";

import { Number } from "../number/number.component";
import { GameIsStart, ToggleReset } from "../../App";
import { GetTimer } from "../header/header.component";

export function Timer({ isFirstClick, win, loose }) {
  const [time, setTime] = useState([0, 0, 0]);
  const intervalRef = useRef();

  useEffect(() => {
    if (isFirstClick) {
      clearInterval(intervalRef.current);
      setTime([0, 0, 0]);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(
        () => timer(time, intervalRef.current),
        1000
      );
    }
    if (win === true || loose === true) {
      clearInterval(intervalRef.current);
    }
  }, [isFirstClick, win, loose]);

  function timer(value, clock) {
    if (value[0] === 9 && value[1] === 9 && value[2] === 9) {
      clearInterval(clock);
      setTime(
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
    setTime(
      value.map((e) => {
        return e;
      })
    );
  }

  return (
    <>
      <div className="timer">
        {time.map((number, index) => {
          return <Number key={index} number={number} />;
        })}
      </div>
    </>
  );
}

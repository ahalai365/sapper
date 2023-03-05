import { React, useContext, useEffect, useState } from "react";
import { ArrMine, IsFirstClick } from "./../../App";
import "./mine.styles.css";

const NUMBERS = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero",
};

const STATE = {
  open: "open",
  mistake: "mistake",
  armed: "armed",
  flag: "flag",
  unknow: "unknow",
  disarmed: "disarmed",
};

export function Mine({ onLeftClick, onRightClick, mine }) {
  const [curMine, setCurMine] = useState(mine);

  useEffect(() => {
    mine.subscribe((newMine) => {
      setCurMine({...newMine});
    })
  }, []);

  let mineClass = "mine_close";

  if (curMine.number) {
    mineClass = "mine_" + NUMBERS[curMine.number];
  } else if (curMine.state === "flag") {
    mineClass = "mine_flag";
  } else if (curMine.state === "unknown") {
    mineClass = "mine_unknown";
  } else if (curMine.open === true) {
    mineClass = "mine_open";
  }

  return (
    <button
      className={`mine ${mineClass}`}
      onClick={() => {
        onLeftClick(curMine.id);
        setCurMine({...mine})
      }}
      onContextMenu={() => {
        onRightClick(curMine.id);
        setCurMine({...mine})
      }}
    ></button>
  );
}

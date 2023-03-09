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

export function Mine({ onLeftClick, onRightClick, mine }) {
  const [curMine, setCurMine] = useState(mine);

  useEffect(() => {
    mine.subscribe((newMine) => {
      setCurMine({ ...newMine });
    });
  }, []);

  let mineClass = "mine_close";

  if (curMine.open === true && curMine.armed === true) {
    mineClass = "mine_mistake";
  } else if (curMine.number && curMine.open === true) {
    mineClass = "mine_" + NUMBERS[curMine.number];
  } else if (curMine.state === "flag") {
    mineClass = "mine_flag";
  } else if (curMine.state === "unknow") {
    mineClass = "mine_unknow";
  } else if (curMine.open === true) {
    mineClass = "mine_open";
  }

  return (
    <button
      className={`mine ${mineClass}`}
      onClick={() => {
        onLeftClick(curMine.id);
        setCurMine({ ...mine });
      }}
      onContextMenu={(e) => {
        onRightClick(curMine.id, e);
        setCurMine({ ...mine });
      }}
    ></button>
  );
}

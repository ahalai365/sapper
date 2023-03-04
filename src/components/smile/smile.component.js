import { React, useContext } from "react";
import "./smile.styles.css";

import { GetScore, GameIsStart } from "../../App";
import { GetTimer } from "./../header/header.component";

export function Smile() {
  const newTimer = [0, 0, 0];

  const gameIsReset = useContext(GameIsStart);
  const getTimer = useContext(GetTimer);

  function handleClick() {
    gameIsReset.setData(!gameIsReset.data);
    getTimer.setTime(newTimer);
  }

  return <button className="smile" onClick={handleClick}></button>;
}

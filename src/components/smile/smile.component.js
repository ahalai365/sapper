import { React, useContext } from "react";
import "./smile.styles.css";

import { GetTimer, GetScore, ToggleReset } from "../../App";

export function Smile() {
  const newTimer = [0, 0, 0];

  const gameIsReset = useContext(ToggleReset);
  const getTimer = useContext(GetTimer);

  function handleClick() {
    gameIsReset.setData(!gameIsReset.data);
    getTimer.setTime(newTimer);
  }

  return <button className="smile" onClick={handleClick}></button>;
}

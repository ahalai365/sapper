import { React, useContext } from "react";
import "./smile.styles.css";

export function Smile({ onClick, win }) {
  let smileClass = "";
  if (win === true) {
    smileClass = "smile_win";
  }
  return <button className={`smile ${smileClass}`} onClick={onClick}></button>;
}

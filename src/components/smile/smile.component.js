import React from "react";
import "./smile.styles.css";

export function Smile() {
  function handleClick() {
    console.log('click')
  }

  return <button className="smile" onClick={handleClick}></button>
}
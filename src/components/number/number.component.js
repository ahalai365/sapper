import { React } from "react";
import "./number.styles.css";

export function Number(props) {
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
  return <div className={`number ${"number_" + NUMBERS[props.number]}`}></div>;
}

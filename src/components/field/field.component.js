import { React, useContext } from "react";
import "./field.styles.css";

import { Mine } from "./../mine/mine.component";
import { ArrMine } from "./../../App";

export function Field() {
  const arrMine = useContext(ArrMine);
  
  return (
    <>
      <div className="field">
        { arrMine.data.map((mine) => <Mine key={mine.id} mine={mine} />) }
      </div>
    </>
  );
}

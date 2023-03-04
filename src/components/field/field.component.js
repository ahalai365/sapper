import { React, useContext, useEffect, useState } from "react";
import "./field.styles.css";
import { ArrMine, IsFirstClick } from "./../../App";
import { Mine } from "./../mine/mine.component";


export function Field() {
  const [isFirstClick, setIsFirstClick] = useState(true);
  const arrMine = useContext(ArrMine);

  return (
    <>
      <div className="field">
        {arrMine.data.map((mine) => (
          <Mine key={mine.id} mine={mine} isFirstClick={isFirstClick} setIsFirstClick={() => {setIsFirstClick(false)}}/>
        ))}
      </div>
    </>
  );
}

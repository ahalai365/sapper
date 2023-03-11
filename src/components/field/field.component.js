import { React, useContext, useEffect, useState } from "react";
import "./field.styles.css";
import { ArrMine, IsFirstClick } from "./../../App";
import { Mine } from "./../mine/mine.component";

export function Field({ onLeftClick, onRightClick, arrMine, loose }) {
  
  return (
    <>
      <div className="field">
        {arrMine.map((mine) => (
          <Mine
            key={mine.id}
            mine={mine}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
            loose={loose}
          />
        ))}
      </div>
    </>
  );
}

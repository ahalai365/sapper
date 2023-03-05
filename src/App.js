import "./App.css";
import React, { useState, createContext, useRef, useEffect } from "react";

import { Game } from "./components/game/game.component";
import { Header } from "./components/header/header.component";
import { Field } from "./components/field/field.component";

export const ArrMine = createContext();
// export const GetTimer = createContext();
export const GetScore = createContext();
export const GameIsStart = createContext();
// export const IsFirstClick = createContext();

function fieldMaker() {
  const field = [];
  for (let i = 0; i < 256; ++i) {
    const mine = {
      id: i,
      armed: false, 
      state: "none", 
      number: null,
      open: false,
      subscribe: (cb) => { mine._cb = cb },
      emit: () => {mine._cb(mine)},
    };
    field.push(mine);
  }



  return field;
}

function getIdArmedMines(curId) {
   const idArmedMines = getRandomArr(0, 255, 40);
   if (idArmedMines.includes(curId)) {
    return getIdArmedMines(curId);
  } else {
    return idArmedMines;
  }
}

function getRandomArr(min, max, length) {
  let arr = [];
  let minId = Math.ceil(min);
  let maxId = Math.ceil(max);
  while (arr.length < length) {
    arr.push(Math.floor(Math.random() * (maxId - minId)) + minId);
  }

  return arr;
}

function App() {
  const [arrMine, setArrMine] = useState(fieldMaker());
  const [win, setWin] = useState(false);
  const [loose, setLoose] = useState(false);
  // const [time, setTime] = useState([0, 0, 0]);
  const [score, setScore] = useState([0, 4, 0]);
  const [gameIsStart, setGameIsStart] = useState(true);
  const [isFirstClick, setIsFirstClick] = useState(true);

  function onLeftClick(id) {
    const mine = arrMine.find((mine) => mine.id === id);
    if (isFirstClick) {
      const arrArmedMine = getIdArmedMines(id);
      arrMine.forEach((mine) => {
        if (arrArmedMine.includes(mine.id)) {
          mine.armed = true;
        }
      })
      setIsFirstClick(false);
    }

    mine.open = true;

    const isLoose = arrMine.some(m => m.armed && m.open);
    if (loose === false && isLoose === true) {
      setLoose(isLoose);
    }
    mine.emit();
  }

  function onRightClick(id) {
    if (isFirstClick) {
      return
    }
    const mine = arrMine.find((mine) => mine.id === id);
    if (mine.state === "none") {
      mine.state = "flag";
    } else if (mine.state === "flag") {
      mine.state = "unknown";
    } else {
      mine.state = "none";
    }
  }

  

  return (
    <Game>
      {/* <Header /> */}
      <Field
        arrMine={arrMine}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
    </Game>
  );
}

export default App;

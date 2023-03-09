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

// создание поля
function fieldMaker() {
  const field = [];
  for (let i = 0; i < 256; ++i) {
    const mine = {
      id: i,
      armed: false,
      state: "none",
      number: null,
      open: false,
      subscribe: (cb) => {
        mine._cb = cb;
      },
      emit: () => {
        mine._cb(mine);
      },
    };
    field.push(mine);
  }

  return field;
}

// получение id мин, при этом не должно совпадать с местом клика
function getIdArmedMines(curId) {
  const idArmedMines = getRandomArr(0, 255, 40);
  if (idArmedMines.includes(curId)) {
    return getIdArmedMines(curId);
  } else {
    console.log(idArmedMines);
    return idArmedMines;
  }
}

// создание массива из неповторяющихся цифар
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
    if (isFirstClick) {
      const arrArmedMine = getIdArmedMines(id);
      arrMine.forEach((mine) => {
        if (arrArmedMine.includes(mine.id)) {
          mine.armed = true;
        }
      });
      setIsFirstClick(false);
    }

    // открытие
    function openMine(mine) {
      console.log("in open", mine);
      if (mine.open === false && mine.state === "none") {
        mine.open = true;
        mine.number = getCount(mine);
        isBomb(mine);
      }

      if (isBomb(mine)) {
        
      }

      // if (getCount(mine) === null) {
      //   for (let x = -1; x <= 1; x++) {
      //     for (let y = -1; y <= 1; y++) {
      //       const nextMine = arrMine.find(
      //         (nextMine) => nextMine.id === mine.id + x + y * 17
      //       );
      //       nextMine.open = true;
      //       nextMine.emit();
      //     }
      //   }
      // }
    }

    // попадание в просак и проверка просака
    function isBomb(mine) {
      if (mine === undefined) {
        return;
      } else if (mine.armed === true && mine.open === true) {
        setLoose(true);
      } else if (mine.armed === true && mine.open === false) {
        return true;
      }
    }

    // перебор мин вокруг клика
    function getCount(mine) {
      let curId = mine.id;
      console.log("curId", curId);
      let count = null;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (
            isBomb(arrMine.find((curMine) => curMine.id === curId + x + y * 17))
          ) {
            count++;
          }
        }
      }
      return count;
    }

    // остановка игры, когда попал в просак
    if (loose) {
      return;
    }

    const mine = arrMine.find((mine) => mine.id === id);
    console.log(mine);

    // ты мне не тыкай!
    if (mine.open === true) {
      return;
    }
    openMine(mine);
    mine.emit();
    // function mineHandler(curId) {
    //   const arrCheckMine = [];
    //   const nextStep = [];

    //   for (let i = 0; i < 3; i++) {
    //     const chekedMine = arrMine.find((mine) => mine.id === curId - 17 + i);
    //     if (chekedMine !== undefined && chekedMine.open === false) {
    //       arrCheckMine.push(chekedMine);
    //     }
    //   }
    //   for (let i = -1; i < 2; i++) {
    //     const chekedMine = arrMine.find((mine) => mine.id === curId - i);
    //     if (chekedMine !== undefined && chekedMine.open === false) {
    //       arrCheckMine.push(chekedMine);
    //     }
    //     // arrCheckMine.push(arrMine.find((mine) => mine.id === curId - i));
    //   }
    //   for (let i = 0; i < 3; i++) {
    //     const chekedMine = arrMine.find((mine) => mine.id === curId + 17 - i);
    //     if (chekedMine !== undefined && chekedMine.open === false) {
    //       arrCheckMine.push(chekedMine);
    //     }
    //     // arrCheckMine.push(arrMine.find((mine) => mine.id === curId + 17 - i));
    //   }
    //   console.log(arrCheckMine);
    //   arrCheckMine.forEach((chekedMine) => {
    //     if (chekedMine.armed === true) {
    //       mine.number += 1;
    //     } else if (chekedMine.open === false) {
    //       nextStep.push(chekedMine);
    //     }
    //     if (chekedMine.id === curId) {
    //       mine.open = true;
    //     }
    //     mine.emit();
    //   });
    //   nextStep.forEach((mine) => mineHandler(mine.id));
    // }

    // const isLoose = arrMine.some((m) => m.armed && m.open);
    // if (loose === false && isLoose === true) {
    //   setLoose(isLoose);
    // }
  }

  function onRightClick(id, e) {
    e.preventDefault();
    if (isFirstClick) {
      return;
    }
    const mine = arrMine.find((mine) => mine.id === id);
    if (mine.state === "none") {
      mine.state = "flag";
    } else if (mine.state === "flag") {
      mine.state = "unknow";
    } else {
      mine.state = "none";
    }

    mine.emit();
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

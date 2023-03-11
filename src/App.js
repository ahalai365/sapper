import "./App.css";
import React, { useState, useEffect } from "react";

import { Game } from "./components/game/game.component";
import { Header } from "./components/header/header.component";
import { Field } from "./components/field/field.component";

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
  const [loose, setLoose] = useState(false);
  const [score, setScore] = useState([0, 4, 0]);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (+score.join("") === 0) {
      if (
        arrMine.filter((mine) => mine.armed === true && mine.state === "flag")
          .length === 40
      ) {
        setWin(true);
      }
    }
  }, [score]);

  function handleSmileClick() {
    setIsFirstClick(true);
    setScore([0, 4, 0]);
    setLoose(false);
    setWin(false);
  }

  function getScoreIncrement(score) {
    let newScore = +score.join("");
    newScore += 1;
    newScore = Array.from(String(newScore), Number);
    if (newScore < 10) {
      newScore.unshift(0);
    }
    newScore.unshift(0);
    setScore(newScore);
  }

  function getScoreDecrement(score) {
    let newScore = +score.join("");
    if (newScore === 0) {
      return;
    }
    newScore -= 1;
    newScore = Array.from(String(newScore), Number);
    if (newScore < 10) {
      newScore.unshift(0);
    }
    newScore.unshift(0);
    setScore(newScore);
  }

  // открытие
  function openMine(mine) {
    if (mine === undefined) {
      return;
    }
    if (mine.open === true) {
      return;
    }

    mine.open = true;

    if (isBomb(mine)) {
      setLoose(true);
    }

    const count = getCount(mine);

    if (count !== null) {
      mine.number = count;
      mine.emit();
      return;
    }
    mine.emit();
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        let newMineId = mine.id + x + y * 16;

        if (newMineId % 16 === 0 && x === 1) {
          newMineId = undefined;
        }

        if ((newMineId + 1) % 16 === 0 && x === -1) {
          newMineId = undefined;
        }
        openMine(arrMine.find((curMine) => curMine.id === newMineId));
      }
    }
  }

  // попадание в просак и проверка просака
  function isBomb(curMine) {
    if (curMine === undefined) {
      return;
    } else if (curMine.armed === true && curMine.open === true) {
      setLoose(true);
      return true;
    } else if (curMine.armed === true && curMine.open === false) {
      return true;
    }

    return false;
  }

  // перебор мин вокруг клика
  function getCount(mine) {
    let count = null;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        let newMineId = mine.id + x + y * 16;

        if (newMineId % 16 === 0 && x === 1) {
          newMineId = undefined;
        }

        if ((newMineId + 1) % 16 === 0 && x === -1) {
          newMineId = undefined;
        }
        if (isBomb(arrMine.find((curMine) => curMine.id === newMineId))) {
          count++;
        }
      }
    }
    return count;
  }
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

    // остановка игры, когда попал в просак
    if (loose) {
      return;
    } else {
      const mine = arrMine.find((mine) => mine.id === id);
      // ты мне не тыкай!
      if (mine.open === true) {
        return;
      }
      openMine(mine);
      mine.emit();
    }
  }

  function onRightClick(id, e) {
    e.preventDefault();
    if (isFirstClick) {
      return;
    }

    if (loose) {
      return;
    }
    const mine = arrMine.find((mine) => mine.id === id);
    if (mine.state === "none" && +score.join("") > 0) {
      mine.state = "flag";
      getScoreDecrement(score);
    } else if (mine.state === "flag") {
      mine.state = "unknow";
      getScoreIncrement(score);
    } else {
      mine.state = "none";
    }

    mine.emit();
  }

  return (
    <Game>
      <Header
        isFirstClick={isFirstClick}
        score={score}
        onClick={handleSmileClick}
        win={win}
        loose={loose}
      />
      <Field
        arrMine={arrMine}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        loose={loose}
      />
    </Game>
  );
}

export default App;

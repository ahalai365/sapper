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

function App() {
  const [arrMine, setArrMine] = useState(fieldMaker());
  // const [time, setTime] = useState([0, 0, 0]);
  const [score, setScore] = useState([0, 4, 0]);
  const [gameIsStart, setGameIsStart] = useState(true);
  // const [isFirstClick, setIsFirstClick] = useState(true);

  function fieldMaker() {
    const field = [];
    for (let i = 0; i < 256; ++i) {
      const mine = {
        id: i,
        armed: false,
        unknow: false,
        flag: false,
        disarmed: false,
        number: null,
        mistake: false,
        open: false,
      };
      field.push(mine);
    }

    return field;
  }

  return (
    <ArrMine.Provider
      value={{
        data: arrMine,
        setData: (data) => {
          setArrMine(data);
        },
      }}
    >
      {/* <GetTimer.Provider
        value={{
          data: time,
          setTime: (data) => {
            setTime(data);
          },
        }}
      > */}
      <GetScore.Provider
        value={{
          data: score,
          setData: (data) => {
            setScore(data);
          },
        }}
      >
        <GameIsStart.Provider
          value={{
            data: gameIsStart,
            setData: (data) => {
              setGameIsStart(data);
            },
          }}
        >
          {/* <IsFirstClick.Provider
            value={{
              data: isFirstClick,
              setData: (data) => {
                setIsFirstClick(data);
              },
            }}
          > */}
            <Game>
              <Header />
              <Field />
            </Game>
          {/* </IsFirstClick.Provider> */}
        </GameIsStart.Provider>
      </GetScore.Provider>
      {/* </GetTimer.Provider> */}
    </ArrMine.Provider>
  );
}

export default App;

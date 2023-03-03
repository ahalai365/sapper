import "./App.css";
import React, { useState, createContext, useRef, useEffect } from "react";

import { Game } from "./components/game/game.component";
import { Header } from "./components/header/header.component";
import { Field } from "./components/field/field.component";

export const ArrMine = createContext();
export const GetTimer = createContext();
export const GetScore = createContext();
export const ToggleReset = createContext();

function App() {
  const [arrMine, setArrMine] = useState(fieldMaker());
  const [time, setTime] = useState([0, 0, 0]);
  const [score, setScore] = useState([0, 4, 0]);
  const [toggleReset, setToggleReset] = useState(true);

  function fieldMaker() {
    const field = [];
    for (let i = 1; i < 257; ++i) {
      const mine = {
        id: i,
        mine: false,
        flag: false,
        unknow: false,
        open: false,
        number: null,
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
      <GetTimer.Provider
        value={{
          data: time,
          setTime: (data) => {
            setTime(data);
          },
        }}
      >
        <GetScore.Provider
          value={{
            data: score,
            setData: (data) => {
              setScore(data);
            },
          }}
        >
          <ToggleReset.Provider
            value={{
              data: toggleReset,
              setData: (data) => {
                setToggleReset(data);
              },
            }}
          >
            <Game>
              <Header />
              <Field />
            </Game>
          </ToggleReset.Provider>
        </GetScore.Provider>
      </GetTimer.Provider>
    </ArrMine.Provider>
  );
}

export default App;

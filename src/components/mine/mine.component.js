import { React, useContext, useEffect, useState } from "react";
import { ArrMine, IsFirstClick } from "./../../App";
import "./mine.styles.css";

export function Mine(props) {
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

  const STATE = {
    open: "open",
    mistake: "mistake",
    armed: "armed",
    flag: "flag",
    unknow: "unknow",
    disarmed: "disarmed",
  };

  const [mine, setMine] = useState(props.mine);
  const arrMine = useContext(ArrMine);

  // пройти по всем ключам и там где тру закинуть ключ в класс
  useEffect(() => {
    if (mine.mistake && mine.open) {
      setMine((prevState) => ({
        ...prevState,
        open: !!prevState.open,
      }));
      console.log(mine.open && mine.mistake);
    }
  }, [mine.open]);

  function checkArmedMines(idArmedMines) {
    if (idArmedMines.filter((id) => id !== mine.id).length < 40) {
      idArmedMines = getRandomArr(0, 255, 40);
      checkArmedMines(idArmedMines);
    } else {
      return idArmedMines;
    }
  }

  function getIdArmedMines() {
    let idArmedMines = getRandomArr(0, 255, 40);
    idArmedMines = checkArmedMines(idArmedMines);

    return idArmedMines;
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

  function handleClick() {
    if (props.isFirstClick) {
      console.log(props.isFirstClick);
      setMine((prevState) => ({
        ...prevState,
        open: !prevState.open,
      }));
      let arrArmedMines = getIdArmedMines();
      console.log(arrArmedMines);
      for (let i = 0; i < arrArmedMines.length; i++) {
        arrMine.data
          .filter(({ id }) => id === arrArmedMines[i])
          .forEach((mine) => {
            mine.mistake = true;
            console.log(mine);
          });
      }
      console.log(props.isFirstClick);
      props.setIsFirstClick();
      console.log(props.isFirstClick);
    } else {
      if (mine.mistake) {
        setMine((prevState) => ({
          ...prevState,
          open: !prevState.open,
        }));
        console.log(mine.open && mine.mistake);
      }
    }
  }

  return (
    <>
      <button
        className={`mine mine_close 
      ${"mine_" + NUMBERS[mine.number]} 
      ${"mine_" + NUMBERS[mine.number]} 
      ${"mine_" + NUMBERS[mine.number]} 
      ${"mine_" + NUMBERS[mine.number]} 
      ${"mine_" + NUMBERS[mine.number]} 
      ${"mine_" + NUMBERS[mine.number]}`}
        onClick={handleClick}
      />
      {/* {mine.number && (
        <button className={`mine ${"mine_" + NUMBERS[mine.number]}`} />
      )}
      {mine.armed && <button className="mine_armed mine" />}
      {mine.disarmed && <button className="mine_disarmed mine" />}
      {mine.unknown && (
        <button className="mine_unknown mine" onClick={handleClick} />
      )}
      {mine.flag && <button className="mine_flag mine" onClick={handleClick} />}
      {mine.mistake && mine.open && <button className="mine_mistake mine" />}
      {mine.open && !mine.mistake ? (
        <button className="mine_open mine" />
      ) : (
        <button className="mine mine_close" onClick={handleClick} />
      )} */}
    </>
  );
}

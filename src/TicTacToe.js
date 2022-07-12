/** @format */
import React, { useState, useEffect } from "react"
import "./components/TicTacToe.css"
import TicSquare from "./components/TicSquare"
import LoseCondition from "./components/LoseCondition.json"

function TicTacToe() {
  const [populate, setPopulate] = useState(allNewSquares())
  const [turnCount, setTurnCount] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameText, SetGameText] = useState("Good Luck!")

  function allNewSquares() {
    const array = []
    for (let i = 0; i < 9; i++) {
      array.push({ isClicked: false, id: i, side: `` })
    }
    return array
  }

  function flip(id) {
    if (!populate[id].isClicked && !isGameOver) {
      setPopulate(x =>
        x.map(y => {
          return y.id === id
            ? { ...y, isClicked: !y.isClicked, side: turnCount % 2 === 0 ? "X" : "O" }
            : y
        })
      )
      iTurn()
    }
    console.log(isGameOver)
  }

  function iTurn() {
    setTurnCount(x => x + 1)
  }
  useEffect(() => {
    for (let i = 0; i < 8; i++) {
      let array = []
      for (let j = 0; j < 3; j++) {
        array.push(populate[LoseCondition[i][j]].side)
      }
      let p1 = array.every(x => x === "X")
      let p2 = array.every(x => x === "O")

      if (p1 === true) {
        setIsGameOver(x => (x = true))
        SetGameText(`X Wins!`)
      } else if (p2 === true) {
        setIsGameOver(x => (x = true))
        SetGameText(`O Wins!`)
      } else if (turnCount === 9) {
        setIsGameOver(x => (x = true))
        if (turnCount >= 9) {
          SetGameText(`It's A Tie!`)
          setIsGameOver(x => (x = true))
        }
      }
    }
  }, [populate])

  function restartGame() {
    if (isGameOver) {
      setIsGameOver(false)
      setTurnCount(0)
      setPopulate(allNewSquares())
      SetGameText(`Good Luck!`)
    }
  }

  const TicSquares = populate.map((x, i) => (
    <TicSquare key={i} isClicked={x.isClicked} side={x.side} click={() => flip(x.id)} />
  ))
  return (
    <div className={`TicTacToeApp ${turnCount % 2 === 0 ? "p2" : "p1"}`}>
      <div className="TicTacToeSquares">{TicSquares}</div>
      <button
        onClick={restartGame}
        className={`RestartButton ${isGameOver ? "RestartOver" : ""}`}
      >
        <div>{gameText}</div> {isGameOver && <div className="smallFont">(restart)</div>}
      </button>
    </div>
  )
}
//
export default TicTacToe

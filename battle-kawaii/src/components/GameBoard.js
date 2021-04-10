import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom'
// import useRecoilState hook
import { useRecoilState } from "recoil"
// importing the atom that controls global state
import { userState } from "../recoil/atoms"

import AuthModel from "../models/AuthModel"
import GamePiece from './GamePiece'
import Game from '../Game'
// const Game = require('')
import './GameBoard.scss'

  const GameBoard = () => {
    const [gameState, setGameState] = useState([])
    // const [mood, setmood ] = useState('happy')
    const game = new Game()
    game.start()
    let board = game.board
    // setGameState(board)
    const colors = {
      green: '#45ff67',
      red: '#ff4567',
      blue: '#5593ff',
      yellow: '#ffff00'
    }
    function generatePieces(board) {
      return board.map((rows, index1) => 
        { return rows.map((piece,index2)=>{
          return (
            <GamePiece
            key={index1*6 +index2}
            size={56}
            color={colors[`${piece}`]}
            id={index1*6 + index2}
            width={rows.length}
            x={index1}
            y={index2}
            swapPieces={game.swapPieces}
            updateBoard={updateBoard}
            
            />
            )
      })})
    }
    function updateBoard() {
      console.log("I'm updating... the board!!")
      generatePieces(board)
      console.log(board)
    }
    // setGameState(generatePieces(board))

  return (
    <div className="board grid">
      { board.length ? generatePieces(board) : "Loading..." }
    </div>

  );
}

export default GameBoard;

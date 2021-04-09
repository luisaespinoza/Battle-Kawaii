import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom'
// import useRecoilState hook
import { useRecoilState } from "recoil"
// importing the atom that controls global state
import { userState } from "../recoil/atoms"

import AuthModel from "../models/AuthModel"
import GamePiece from './GamePiece'
import {puzzlePieces,legalMoveCandidates,createGameBoard,board,getRandomPiece,checkMatch, checkNextIn, checkMatches, randomizeBoard, checkBoardHasMoves } from '../Game'
// const Game = require('')
import './GameBoard.scss'

  const GameBoard = () => {
    const [gameState, setGameState] = useState([])
    // const [mood, setmood ] = useState('happy')
    randomizeBoard()
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
            size={56}
            color={colors[`${piece}`]}
            id={index1*6 + index2}
            width={rows.length}
            x={index1}
            y={index2}
            />
            )
      })})
    }

  return (
    <div className="board grid">
      { board.length ? generatePieces(board) : "Loading..." }
    </div>

  );
}

export default GameBoard;

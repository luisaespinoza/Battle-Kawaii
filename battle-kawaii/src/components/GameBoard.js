import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom'
// import useRecoilState hook
import { useRecoilState } from "recoil"
// importing the atom that controls global state
import { userState } from "../recoil/atoms"

import AuthModel from "../models/AuthModel"
import GamePiece from './GamePiece'
import {puzzlePieces,legalMoveCandidates,createGameBoard,board,getRandomPiece,checkMatch, checkNextIn, checkMatches, randomizeBoard, checkBoardHasMoves } from '../Game'
import './GameBoard.scss'

  const GameBoard = () => {
    const [gameState, setGameState] = useState()
    // const [mood, setmood ] = useState('happy')
    randomizeBoard()
    const colors = {
      green: '#45ff67',
      red: '#ff4567',
      blue: '#5593ff',
      yellow: '#ffff00'
    }
    function generatePieces(board) {
      return board.map((rows) => (rows.map((piece,index)=>(
        <GamePiece
        size={56}
        color={colors[`${piece}`]}

        />
      ))))
    }
  return (
    <div className="board grid">
      { board.length ? generatePieces(board) : "Loading..." }
    </div>

  );
}

export default GameBoard;

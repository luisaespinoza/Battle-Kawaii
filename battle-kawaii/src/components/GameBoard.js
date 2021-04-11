import React, {useEffect,useState,useRef,useMemo,cloneAndUpdate} from 'react';
import {cloneDeep} from "lodash"
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
    const colors = {
      green: '#45ff67',
      red: '#ff4567',
      blue: '#5593ff',
      yellow: '#ffff00'
    }
    const game = new Game()
    game.start()
    let board = game.board
    const [gameState, setGameState] = useState(cloneDeep(game.board))
    const [globalMood,setGlobalMood] = useState('ko')
    // const [turnState,setTurnState] = useState(0)
    // let   [,setState] = useState()
    let pieces = generatePieces(gameState)
    // const[boardState,setBoardState] = useState(generatePieces(gameState))
    // const [mood, setmood ] = useState('happy')
    // setGameState(board)
    console.log(board)
    const reassignColors = () =>{
      "I'm reassigning colors?!?!?!?!?!?!?!?!?!!????????????!?!?!?!?!?!?!?!?!??"
      let temp =  generatePieces(gameState)
      console.log(pieces)
      for(let i = 0 ; i < pieces.length; i++ ){
        for(let j = 0; j < pieces[i].length; j++) {
          console.log(pieces[i][j].props.colorName)
          if(pieces[i][j].props.colorName!==temp[i][j].props.colorName){
            pieces[i][j] = {...temp[i][j]}
            console.log(pieces[i][j],temp[i][j],"a side by side comparison!!!!!!!!!!!!!!!!!!!")
          }
        }
      }
    }
    function updateBoard() {
      console.log(board)
      // pieces = generatePieces(gameState.board)
      console.log('previous state',game.board)
      // setTurnState(turnState+1)
      let clone = cloneDeep(game.board)
      setGameState(clone)
      // if(globalMood!=='sad'){
      //   setGlobalMood('sad')
      // } else {
      //   setGlobalMood('blissful')
      // }

      // setBoardState(generatePieces(gameState))
      // setGameState(game)
      reassignColors()
      console.log("new state",gameState)
    }
    console.log(gameState)
    function generatePieces(board) {
      // console.log(board)
      return board.map((rows, index1) => 
        { return rows.map((piece,index2)=>{
          return (
            <GamePiece
            key={index1*6 +index2}
            size={56}
            colorName={gameState[index1][index2]}
            color={gameState[index1][index2]}
            mood={globalMood}
            setMood={setGlobalMood}
            id={index1*6 + index2}
            width={rows.length}
            x={index1}
            y={index2}
            swapPieces={game.swapPieces}
            updateBoard={updateBoard}
            // turn={turnState}
            />
            )
          }
          )
        })
      // let temp =[]
      // for(let i = 0 ; i<board.length;i++){
      //   for(let j = 0 ; j<board[i].length;j++){
      //     temp.push(

      //       <GamePiece
      //       key={i*6 +j}
      //       size={56}
      //       colorName={`${board[i][j]}`}
      //       color={colors[`${board[i][j]}`]}
      //       id={i*6 + j}
      //       width={board[0].length}
      //       x={i}
      //       y={j}
      //       swapPieces={gameState.swapPieces}
      //       updateBoard={updateBoard}
      //       />
      //       )
      //   }
      // }
      // return temp
    }
    // let components = useRef(pieces)
    // console.log(pieces,"joaajfndgjnadfljkngklsjdfnhlkjsd34u0=93w4-tneparngo wn459ngsdnfhlkjsnth9u w45n")
    // let gameBoard = useRef(generatePieces(board))
    // let components=generatePieces(board)
    // setGameState([...components])}
      // components = generatePieces(board)
      // gameBoard.current = generatePieces(board)
      // setGameState([...components])
      // console.log(board)
      // console.log(gameBoard.current)
    // setGameState(generatePieces(board))
    // const gameBoard = useMemo(()=>{
    //   return (<>
    //   <Updates updates={pieces}
    //     </>
    //     );
    //   })
      return(
        <div className="board grid">
          {/* {gameState} */}
        { gameState.length ? pieces : "Loading..."}
        {/* {gameBoard} */}
        </div>
) 
}

export default GameBoard;

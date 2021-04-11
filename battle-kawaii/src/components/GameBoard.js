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
    const game = useRef(new Game())
    // let board = game.board
    // const [gameState, setGameState] = useState(new Game() )
    // setGameState(gameState.start())
    const [boardState, setBoardState] = useState(cloneDeep(game.current.board))
    const [globalMood,setGlobalMood] = useState('ko')
    // const [turnState,setTurnState] = useState(0)
    // let   [,setState] = useState()
    console.log(boardState)
    let pieces = generatePieces(boardState)
    // const[boardState,setBoardState] = useState(generatePieces(boardState))
    // const [mood, setmood ] = useState('happy')
    // setGameState(board)
    // console.log(board)
    // const reassignColors = () =>{
    //   "I'm reassigning colors?!?!?!?!?!?!?!?!?!!????????????!?!?!?!?!?!?!?!?!??"
    //   let temp =  generatePieces(boardState)
    //   console.log(pieces)
    //   for(let i = 0 ; i < pieces.length; i++ ){
    //     for(let j = 0; j < pieces[i].length; j++) {
    //       console.log(pieces[i][j].props.colorName)
    //       if(pieces[i][j].props.colorName!==temp[i][j].props.colorName){
    //         pieces[i][j] = {...temp[i][j]}
    //         console.log(pieces[i][j],temp[i][j],"a side by side comparison!!!!!!!!!!!!!!!!!!!")
    //       }
    //     }
    //   }
    // }
    function updateBoard() {
      // console.log(game.board)
      // pieces = generatePieces(boardState.board)
      console.log('previous state',game.current.board)
      // setTurnState(turnState+1)
      let clone = cloneDeep(game.current.board)
      setBoardState(clone)
      console.log("new state",game.current.board)

      // if(globalMood!=='sad'){
      //   setGlobalMood('sad')
      // } else {
      //   setGlobalMood('blissful')
      // }

      // setBoardState(generatePieces(boardState))
      // setGameState(game)
      // reassignColors()
    }
    console.log(boardState)
    function generatePieces(board) {
      // console.log(board)
      return board.map((rows, index1) => 
        { return rows.map((piece,index2)=>{
          return (
            <GamePiece
            key={index1*6 +index2}
            size={56}
            colorName={boardState[index1][index2]}
            color={boardState[index1][index2]}
            mood={globalMood}
            setMood={setGlobalMood}
            id={index1*6 + index2}
            width={rows.length}
            x={index1}
            y={index2}
            swapPieces={game.current.swapPieces}
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
      //       swapPieces={boardState.swapPieces}
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
          {/* {boardState} */}
        { boardState.length ? pieces : "Loading..."}
        {/* {gameBoard} */}
        </div>
) 
}

export default GameBoard;

import React, {useState,useRef} from 'react';
import {cloneDeep} from "lodash"
import { Prompt} from 'react-router-dom'
import GamePiece from './GamePiece'
import Game from '../Game'
import './GameBoard.scss'

  const GameBoard = (props) => {
    const shouldBlockNavigation=true
    const game = useRef(new Game())

    const gameHandler= (props) =>{
      // if(props.game && loadedGame){
      //   assign Game variables
      // }
      if(!game.current.board){
        game.current.start()
      } 
    }

    gameHandler(props)
    const [boardState, setBoardState] = useState(cloneDeep(game.current.board))
    const [globalMood,setGlobalMood] = useState('ko')
    let pieces = generatePieces(boardState)

    function updateBoard() {
      let clone = cloneDeep(game.current.board)
      setBoardState(clone)
    }

    function saveGame(e,props) {
      console.log(game.current)
      e.preventDefault()
      props.handleSubmit(e,game.current)

    }
    console.log(boardState)
    function generatePieces(board) {
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
            />
            )
          }
          )
        })
      
    }
    
      return(
        <>
        <div className="board grid">
        { boardState.length ? pieces : "Loading..."}
        <Prompt
        when={shouldBlockNavigation}
        message='You have unsaved changes, are you sure you want to leave?'
        />
        </div>
        <form action="POST">
        <button className="saveGame" onClick={(e) => {saveGame(e,props)}}>SaveGame</button>
        </form>
        </>
) 
}

export default GameBoard;

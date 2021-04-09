import React, {useState} from 'react'
import {Mug, Planet} from 'react-kawaii'
export default function GamePiece(props) {
  const [mood,setMood] = useState('happy')
  let timer = null
  let grabbedPiece = null
  let dropTarget = null
  const storeGrabbedPiece = (e) =>{
    grabbedPiece = parseInt(e.target.id)
    console.log(grabbedPiece)
  }
  const storeDropTarget = (e) =>{
    dropTarget = parseInt(e.target.id)
    console.log(dropTarget)
  }
  const checkMoveValidity = () => {
    let validMoves = [grabbedPiece-1, grabbedPiece+1, grabbedPiece+props.width,grabbedPiece-props.with]
    let isValidMove = validMoves.includes(dropTarget)
    return isValidMove
  }
  const swapPieces = () => {
    console.log("here to indicate the drag action is ending. ")
    if(checkMoveValidity()) {
      // props.
    }
  }

  const mouseEnterMood = () => {
    // console.log(timer)
    clearTimeout(timer)
      setMood('blissful')
  }
    const mouseLeaveMood = () => {
      setMood('sad')
      timer = setTimeout(() => {
        setMood('happy')
      }, 600);
      // console.log(timer)
    }
    return (
    <div 
    className='piece' 
    draggable id={props.id} 
    onMouseEnter={mouseEnterMood} 
    onMouseLeave={mouseLeaveMood} 
    onDragOver={(e)=>console.log(e.preventDefault)} 
    onDragStart={storeGrabbedPiece} 
    onDragEnd={(e)=>console.log(e.target)} 
    onDragEnter={(e)=>e.preventDefault()} 
    onDragLeave={(e)=>e.preventDefault()} 
    onDragDrop={storeDropTarget} 
    onDragEnd={swapPieces}>
      <Planet size={props.size} mood={mood} color={props.color}/>
    </div>
  )
}

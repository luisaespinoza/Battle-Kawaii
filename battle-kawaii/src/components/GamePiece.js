import React, {useState, useRef, useEffect} from 'react'
import {Mug, Planet} from 'react-kawaii'

export let grabbedPiece = null
export let dropTarget = null
export let firstClick = true
export let counter = 0
export default function GamePiece(props) {
  // console.log(props,"aslkdjfalksdjflkasjdflkajdlkfjaskldfj")
  const [mood,setMood] = useState('happy')
  const [color,setColor] = useState(props.color)
  const colors = {
      green: '#45ff67',
      red: '#ff4567',
      blue: '#5593ff',
      yellow: '#ffff00'
    }
  let timer = useRef(null)
  const timerHandler = (newValue) => { 
    if(newValue>0){
      timer.current = setTimeout(() => {
        setMood('happy')
      }, 800);
    }
    else{
      clearTimeout(timer.current)
    }
  }
  
  const checkMoveValidity = (props) => {
    let validMoves = [parseInt(grabbedPiece.id-1), parseInt(grabbedPiece.id)+1, parseInt(grabbedPiece.id)+props.width,parseInt(grabbedPiece.id)-props.width]
    let isValidMove = validMoves.includes(parseInt(dropTarget.id))
    console.log(validMoves)
    console.log(isValidMove)
    return isValidMove
  }


  const swapPieces = (props) => {
    console.log(grabbedPiece,dropTarget,"I'm swapping pieces!!!")
    // console.log("board before:", board)
    // console.log("here to indicate the drag action is ending. ")
    if(checkMoveValidity(props)) {
      console.log("I'm a valid move!!! _+_+_+_+_+_+_+_+__+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_")
      props.swapPieces(parseInt(grabbedPiece.dataset.x),parseInt(grabbedPiece.dataset.y),parseInt(dropTarget.dataset.x),parseInt(dropTarget.dataset.y))
    }
    // console.log("board after:", board)
  }
  // const updateBoard = (props) => {

  //   props.updateBoard()
  // }



  function clickHandler(e, props){
    console.log(props)
    // e.stopImmediatePropagation()
    // counter += 1
    // console.log(counter)
    // console.log(grabbedPiece,dropTarget)
    // console.log(e.currentTarget)
    if(e.currentTarget.className==='piece') {
      if(firstClick) {
        firstClick = !firstClick
        setMood(props.mood)
        // console.log("first click= ", firstClick)
        grabbedPiece= e.currentTarget
        // console.log("this is the grabbedPiece",grabbedPiece)
        grabbedPiece.style.background='yellow'
        // grabbedPiece.style.borderWidth ='4px'
      } else if(!firstClick){
        // console.log("secondClick")
        firstClick=!firstClick
        dropTarget = e.currentTarget
        dropTarget.style.background='blue'

        // console.log("this is the droptarget", dropTarget)
        swapPieces(props)
        grabbedPiece.style.background = ""
        dropTarget.style.background = ""
        grabbedPiece=null
        dropTarget=null
        setMood(props.mood)
        props.updateBoard()
        // setColor(props.color)
    } else{
      firstClick=true
      grabbedPiece.style.background=""
      dropTarget=null
      grabbedPiece=null
    }
  }
}

  const mouseEnterMood = () => {
    // console.log(timer)
    timerHandler(0)
      setMood('blissful')
  }
    const mouseLeaveMood = () => {
      setMood('sad')
      timer.current = setTimeout(() => {
        setMood('happy')
      }, 600);
      // console.log(timer)
    }
    return (
    <div
    data-x={props.x}
    data-y={props.y}
    className='piece' 
    draggable id={props.id}
    onClick={(e)=>clickHandler(e,props)}
    onMouseEnter={mouseEnterMood} 
    onMouseLeave={mouseLeaveMood}
    >
      <Planet size={props.size} mood={mood} color={colors[`${props.color}`]}/>
    </div>
  )
}

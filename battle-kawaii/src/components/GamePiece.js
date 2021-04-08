import React, {useState} from 'react'
import {Mug, Planet} from 'react-kawaii'
export default function GamePiece(props) {
  const [mood,setMood] = useState('happy')
  let timer = null
  const mouseEnterMood = () => {
      clearTimeout(timer)
    if(mood==='happy') {
      setMood('blissful')
    }
  }
    const mouseLeaveMood = () => {
      setMood('sad')
      timer = setTimeout(() => {
        setMood('happy')
      }, 600);
      console.log(timer)
    }
    return (
    <div className='piece' draggable id={props.id} onMouseEnter={mouseEnterMood} onMouseLeave={mouseLeaveMood}>
      <Planet size={props.size} mood={mood} color={props.color}/>
    </div>
  )
}

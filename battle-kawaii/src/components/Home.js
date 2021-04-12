import React, {useState} from 'react'
import HomeKawaii from '../components/HomeKawaii'

export default function Home() {
  const [mood,setMood] = useState('happy')
  const [color,setColor] = useState('red')
  const [shape, setShape] = useState('Planet')

  return (
    <div>
        <HomeKawaii
        size={360}
        color={color}
        mood={mood}
        shape={shape}
        />
        {/* <button onClick={handleColorButton}>Change Color</button>
        <button onClick={handleMoodButton}>Change Mood</button>
        <button onClick={handleShapeButton}>Change Shape</button> */}
      </div>
    )
  }
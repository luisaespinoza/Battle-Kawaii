import React, {useState, useRef, useEffect} from 'react'
import {Backpack, Browser, Cat, CreditCard, File, Ghost, IceCream, Mug, Planet, SpeechBubble} from 'react-kawaii'
import { useRecoilState } from "recoil"
import { userState } from "../recoil/atoms"

import AuthModel from "../models/AuthModel"
import '../components/HomeKawaii.scss'

export default function HomeKawaii(props) {
  const [mood,setMood] = useState('happy')
  const [color,setColor] = useState('red')
  const [shape, setShape] = useState('Planet')
  const [user, setUser] = useRecoilState(userState)


  const colors = {
      green: '#45ff67',
      red: '#ff4567',
      orange: '#FFA500',
      indigo: '#4B0082',
      violet:'#EE82EE',
      blue: '#5593ff',
      yellow: '#ffff00'
    }

    const moods = ['sad', 'shocked', 'happy', 'blissful', 'lovestruck', 'excited', 'ko']
    const colorNames = ['red','orange','green', 'blue','indigo','violet']
    const shapes = ['Backpack','Browser','Cat','CreditCard','File','Ghost','IceCream','Mug','Planet','SpeechBubble']
  
  let timer = useRef(null)

  useEffect(function () {
    if (localStorage.getItem("uid")) {
      AuthModel.verify().then((response) => {
        setUser(response.user)
      })
    }
  }, [])
    function handleColorButton() {
      let index = colorNames.indexOf(color)
      index +=1 
      index= index === colors.length ? 0 : index
      setColor(colorNames[index])
    }

    const handleMoodButton= () => {
      let index = moods.indexOf(mood)
      index +=1 
      index= index === moods.length ? 0 : index
      setMood(moods[index])
    }

    const handleShapeButton=() => {
      let index = shapes.indexOf(shape)
      index +=1 
      index= index === shapes.length ? 0 : index
      setShape(shapes[index])
    }


  const timerHandler = (newValue) => { 
    if(newValue>0){
      timer.current = setTimeout(() => {
        setMood(mood)
      }, 800);
    }
    else{
      clearTimeout(timer.current)
    }
  }

  function clickHandler(e, props){
    if(e.currentTarget.className==='home-piece') {
      setMood('ko')
    }
  }

  const mouseEnterMood = () => {
    timerHandler(0)
    setMood('blissful')
  }
  const mouseLeaveMood = () => {
    setMood('sad')
    timer.current = setTimeout(() => {
      setMood('happy')
    }, 600);
  }
  return(
    <>
    <div className='home-piece-container'>
      
    <div
    className='home-piece' 
    onClick={(e)=>clickHandler(e,props)}
    onMouseEnter={mouseEnterMood} 
    onMouseLeave={mouseLeaveMood}
    >
    {shape==='Backpack'?<Backpack size={props.size} mood={mood} color={colors[`${color}`]}/>:<></> }
    {shape==='Browser'?<Browser size={props.size} mood={mood} color={colors[`${color}`]}/>: <></>}
    {shape==='Cat'?<Cat size={props.size} mood={mood} color={colors[`${color}`]}/>: <></>}
    {shape==='CreditCard'?<CreditCard size={props.size} mood={mood} color={colors[`${color}`]}/>:<></> }
    {shape==='File'?<File size={props.size} mood={mood} color={colors[`${color}`]}/>: <></>}
    {shape==='Ghost'?<Ghost size={props.size} mood={mood} color={colors[`${color}`]}/>: <></>}
    {shape==='IceCream'?<IceCream size={props.size} mood={mood} color={colors[`${color}`]}/>:<></> }
    {shape==='Mug'?<Mug size={props.size} mood={mood} color={colors[`${color}`]}/>: <></>}
    {shape==='Planet'?<Planet size={props.size} mood={mood} color={colors[`${color}`]}/>: <></>}
    {shape==='SpeechBubble'?<SpeechBubble size={props.size} mood={mood} color={colors[`${color}`]}/>:<></>}
    </div>
    <div className='space'></div>
    { user && !props.noButtons ? (
      <>
      <div className="buttons-container">
      <button onClick={handleColorButton}>Change Color</button>
      <button onClick={handleMoodButton}>Change Mood</button>
      <button onClick={handleShapeButton}>Change Shape</button>
      </div>
      </>
      ) : (
        <>
      </>
      ) }
      </div>
    </>
  )
}
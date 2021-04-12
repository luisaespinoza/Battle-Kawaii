import React from 'react'
import HomeKawaii from '../components/HomeKawaii'

export default function Home() {
  return (
    <div>
        <HomeKawaii
        size={224}
        color={'red'}
        mood={'happy'}
        />
      </div>
    )
  }
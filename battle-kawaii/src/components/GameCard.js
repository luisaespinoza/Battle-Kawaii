
import React from 'react';
import HomeKawaii from '../components/HomeKawaii'
import './GameCard.scss'

const GameCard = (props) => {
  return (
    <div className="GameCard">
      <HomeKawaii
      size={64}
      noButtons={true}
      />
    </div>
  );
}

export default GameCard;
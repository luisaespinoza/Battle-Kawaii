import React from 'react';

import useGames from '../hooks/useGames'
import GameCard from '../components/GameCard'

function GameShow(props) {
  const [game] = useGames(props.match.params.id)
  
  return (
    <div>
      <GameCard {...game} />
    </div>
  );
}

export default GameShow;
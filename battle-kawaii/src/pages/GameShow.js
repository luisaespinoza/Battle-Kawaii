import React from 'react';

import useGames from '../hooks/useGames'
import GameBoard from '../components/GameBoard'

function GameShow(props) {
  // const [game] = useGames(props.match.params.id)
  
  return (
    <div>
      <GameBoard />
    </div>
  );
}

export default GameShow;
import React from 'react'
import { Link } from 'react-router-dom'

import useGames from '../hooks/useGames'
import GameCard from '../components/GameCard'

function GameList(props) {
  const [games, fetchGames] = useGames()

  function generateList(games) {
    return games.map((game, index) => (
      <Link to={`/games/${game._id}`} key={ index }>
        <GameCard {...game} />
      </Link>
    ))
  }

  return (
    <div>
      <div className='games-container'>
        <h1>All Games</h1>
        { games.length ? generateList(games) : "Loading..." }
        {/* <button onClick={fetchGames}>Get Games</button> */}
      </div>
    </div>
  )
}

export default GameList;

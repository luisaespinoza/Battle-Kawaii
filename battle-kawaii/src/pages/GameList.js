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
      <h1>All Games</h1>
      {/* conditional rendering allows us to show a user 
          content while the renders componenets and gets data from an API */}
      { games.length ? generateList(games) : "Loading..." }
      <button onClick={fetchGames}>Get Games</button>
    </div>
  )
}

export default GameList;

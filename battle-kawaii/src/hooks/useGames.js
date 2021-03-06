import { useState, useEffect } from 'react'
import GameModel from "../models/Game"

// define the custom hook with the "use" naming convention
function useGames(gameId) {
  const [games, setGames] = useState([])
  // fetch the games to here in the custom hook
  function fetchGames(id) { 
    if (id) {
      GameModel.show(id).then((data) => {
        setGames(data.game);
      });
    } else {
      GameModel.all().then((data) => {
        // invoke the setter function
        setGames(data.games)
      })
    }
  }

  useEffect(
    function () {
      console.log("carmen once requested I put a console log here to confirm that unicorns really do exist")
      fetchGames(gameId)
    },
    // useEffect will run on initial call and whenever the gameId changes
    [gameId]
  )

  return [games, fetchGames]
}

export default useGames;
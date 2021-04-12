import React, { useState, useEffect} from 'react';
import GameModel from '../models/Game'
import AuthModel from '../models/AuthModel'
import GameBoard from '../components/GameBoard'
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import useGames from '../hooks/useGames'

function GameShow(props) {
  console.log("these are the show page's props<><><><><><><><><><><><><><><><><><><><><><>", props)
  const[user, setUser] = useRecoilState(userState)
  const [game , setGame] = useState(useGames(props.match.params.id))
console.log("this the game state.......",game)
useEffect(function () {
if (localStorage.getItem('uid')) {
            AuthModel.verify().then((response) => {
                setUser(response.user)
            })
        }
    }, [])

  function handleSubmit(event,data) {
    console.log(data)
    event.preventDefault();
    let board = data.board
    let legalMoveCandidates = data.legalMoveCandidates
    let player = user 

    GameModel.create({board, legalMoveCandidates, player})
      .then(data => {
        console.log(data)
        props.history.push('/games')
      })
  }
  return (
      <GameBoard
      // game={game ? game : "Fetching unicorns.................Just kidding."}
      handleSubmit={handleSubmit}
      />
  );
}

export default GameShow;
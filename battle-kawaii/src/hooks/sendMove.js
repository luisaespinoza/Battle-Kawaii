// import { useState, useEffect } from 'react'
// import GameModel from "../models/Game"
// const io = require("socket.io-client");
// const socket = io("http:localhost:3001", {
//   withCredentials: true,
// });
// // define the custom hook with the "use" naming convention
// function sendMove(gameId) {
//   useEffect(
//     function () {
//       fetchGames(gameId)
//     },
//     // useEffect will run on initial call and whenever the gameId changes
//     [gameId]
//   )

//   return [games, fetchGames]
// }

// export default useGames;
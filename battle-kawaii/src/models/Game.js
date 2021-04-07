const url = `http://localhost:3001/api/v1`

class GameModel {
  // the "static" keyword allows us to invoke the method without an instance of the class
  static all = () => {
    return fetch(`${url}/games`, {
      headers: { authorization: `Bearer ${ localStorage.uid }` }
    }).then(res => res.json())
  }

  static show = (gameId) => {
    return fetch(`${url}/games/${gameId}`).then(res => res.json())
  }

  static create = (gameData) => {
    return fetch(`${url}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameData)
    })
      .then(res => res.json())
  }
}

export default GameModel

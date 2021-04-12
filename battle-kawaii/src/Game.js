
export default class Game {
  puzzlePieces = ['red','green','blue','yellow']
  legalMoveCandidates = []
  board 
  players= {
    playerHp: 20,
    opponentHp: 20,
    playerInventory: {
      blue: null,
      green: null,
      yellow: null,
    },
    opponentInventory:{
      blue: null,
      green: null,
      yellow: null,
    },
  }

  createGameBoard = (x, y) => {
    let board = []
    for( let i = 0 ; i < x ; i++) {
      board.push(new Array(y))
    }
    return board
  }

getRandomPiece = () => {
  return this.puzzlePieces[Math.floor(Math.random()*this.puzzlePieces.length)]
}


checkMatch = (x1, y1, x2, y2) => {
  // is next piece on the this.board?
  let board = this.board
  let isXInBounds = ( x2 < board.length && 0 <= x2 )
  if(isXInBounds) {
    let isYInBounds = ( y2 < board[x2].length && 0 <= y2 )
    if(isYInBounds) {
      // if so...
      let isNextMatch = (board[x1][y1] === board[x2][y2])
      return isNextMatch
    }
  }
  return false
}


checkNextIn=(x , y, axis, direction) => {
  // 'c' is our constant incrementer/decrementer for the recursive callback chain
  const c = (direction === '+') ? 1 : -1
  // if the next tile on the axis matches: 
  // add direction constant to axis coordinate and check next in line
  // else return this value as the end of the series
  if (axis === 'x') {
    if(this.checkMatch(x, y, x + c, y)) {
      let xNew = x + c
      // launch recursive callback for next in line
      return this.checkNextIn(xNew,y,axis,direction)
    } else {
      return x
    }
  }
  else {
    if (this.checkMatch(x, y, x, y + c)) {
      let yNew = y + c
      // launch recursive callback for next in line
      return this.checkNextIn(x,yNew,axis,direction)
    } else {
      return y
    }
  }
}


checkMatches = (x, y) => {
  let matchResults = {
    hasMatches: false,
    start: [x,y],
    end:[x,y],
    xMatchRange:null,
    yMatchRange:null,
    xMatchColor:null,
    yMatchColor:null,
    isCandidate: false
  } 

  const axes = ['x','y']
  const directions = ['-','+']

// check each axis and direction for matches 
// '-' direction for start points |||| '+' direction for end points
  for(let j = 0; j <= 1 ; j++) {
    let axis = axes[j]
    matchResults.start[j] = parseInt(this.checkNextIn(x,y,axis,directions[0]))
    matchResults.end[j] = parseInt(this.checkNextIn(x,y,axis,directions[1]))
  } 
  // check length of series for each axis
  // dump into new array [x,y]
  let matchRanges = matchResults.end.map(function(coordinate,index){
    return coordinate - matchResults.start[index] + 1
  })
  // check if there are any series of matches 3 or greater
  let xHasMatches = matchRanges[0] >= 3
  let yHasMatches = matchRanges[1] >= 3
  if (xHasMatches || yHasMatches){
    let x = matchResults.start[0]
    let y = matchResults.start[1]
    matchResults.xMatchColor= xHasMatches ? this.board[x][y] : null
    matchResults.yMatchColor= yHasMatches ? this.board[x][y] : null
    matchResults.hasMatches = true
  }

  xHasMatches = matchRanges[0] >= 2
  yHasMatches = matchRanges[1] >= 2
  if (xHasMatches || yHasMatches){
    matchResults.isCandidate = true
  }
  // update match ranges anyway. A series of 2 can be used as
  // candidates to check if the this.board has legal moves?? Hmm...
  // Might need to create new propery called candidateForMatch
  // and store any that flag true into an array, 
  // instead of checking the entire this.board. 
  matchResults.xMatchRange = matchRanges[0]
  matchResults.yMatchRange = matchRanges[1]
  // returns object of results 
  return matchResults
}


randomizeBoard = () => {
  let x = this.board.length
  let y = this.board[0].length
  for(let i = 0 ; i < x ; i++){
    for( let j = 0; j < y ; j++){
      // generate a random piece in place until a piece 
      // that doesn't create a 3 series is generated.
      let isMatching = true
      let matchesFound
      while(isMatching) {
        this.board[i][j] = this.getRandomPiece()
        matchesFound = this.checkMatches(i,j)
        isMatching = matchesFound.hasMatches
      }
      if(matchesFound.isCandidate) {
        this.legalMoveCandidates.push(matchesFound)
      }
      // succeeding, carry on to next tile
    }
  }
}

checkBoardHasMoves = () => {
  if(this.legalMoveCandidates.length){

    for(let i = 0; i<=this.legalMoveCandidates.length; i++) {
      let candidate = this.legalMoveCandidates[i]
      console.log(candidate)
      let xStart = candidate.start[0]
      let yStart = candidate.start[1]
      let xEnd = candidate.end[0]
      let yEnd = candidate.end[1]
      if (candidate.xMatchRange >= 2) {
        let toCheck = candidate.start[0] - 2
        if (this.checkMatch(xStart,yStart,toCheck,yStart)) {
          return true
        }
        toCheck = candidate.end[0] + 2
        if (this.checkMatch(xEnd,yEnd,toCheck, yEnd)) {
          return true
        }
      }
      else if (candidate.yMatchRange >= 2) {
        let toCheck = candidate.start[1] - 2
        if (this.checkMatch(xStart,yStart,xStart,toCheck)) {
          return true
        }
        toCheck = candidate.end[1] + 2
        if (this.checkMatch(xEnd,yEnd,xEnd, toCheck)) {
          return true
        }
      }
    }
  }
  return false
}
setInventory = (matchRange,matchColor) => {
  this.players.playerInventory[`${matchColor}`] += matchRange
}
replacePieces= (results,matchRange) => {
  let x = results.start[0]
  let y = results.start[1]
  if(results.xMatchRange>=3 ){
    for(let i = 0 ; i < matchRange ; i++){
      this.board[x+i][y] = null
      for( let candidate in this.legalMoveCandidates){
        if(candidate.start===[x+i,y] || candidate.end===[x+i,y]){
          let index = this.legalMoveCandidates.indexOf(candidate)
          this.legalMoveCandidates.splice(index,1)
        }
      }
      }
    for(let i = 0 ; i < matchRange ; i++){
      let isMatching= true 
      let matchesFound
      while(isMatching){
        this.board[x+i][y] = this.getRandomPiece()
        matchesFound = this.checkMatches(x+i,y)
        isMatching = matchesFound.hasMatches
      } 
      if(matchesFound.isCandidate){
        this.legalMoveCandidates.push(matchesFound)
      }
    }
  }
  if(results.yMatchRange>=3){
    for(let i = 0 ; i < matchRange ; i++){
      this.board[x][y+i] = null
      for( let candidate in this.legalMoveCandidates){
        if(candidate.start===[x,y+i] || candidate.end===[x,y+i]){
          let index = this.legalMoveCandidates.indexOf(candidate)
          this.legalMoveCandidates.splice(index,1)
        }
      }
    }
    for(let i = 0 ; i < matchRange ; i++){
      let isMatching= true 
      let matchesFound
      while(isMatching){
        this.board[x][y+i] = this.getRandomPiece()
        matchesFound = this.checkMatches(x,y+i)
        isMatching = matchesFound.hasMatches
      }
      if(matchesFound.isCandidate){
        this.legalMoveCandidates.push(matchesFound)
      } 
    }
  }
}
updateVitals = (results) => {
  if (results.xMatchRange >= 3) {
    if(results.xMatchColor !=='red'){
      this.setInventory(results.xMatchRange,results.xMatchColor)
    } else {
      this.updateHp(results.xMatchRange)
    }
    this.replacePieces(results, results.xMatchRange)
  }
  if (results.yMatchRange >=3) {
    if(results.yMatchColor !=='red'){
      this.setInventory(results.yMatchRange, results.yMatchColor)
    } else{
      this.updateHp(results.yMatchRange)
    }
    this.replacePieces(results, results.yMatchRange)
  }
}
updateHp = (matchRange) => {
  let amount = -matchRange
  this.setPlayerHp(amount,this.players.opponentHp)
}
setPlayerHp = (amount, player) => {
  player += amount 
}
updateGame= (results1,results2) => {
  this.updateVitals(results1)
  this.updateVitals(results2)
}
swapPieces = (x1,y1,x2,y2) =>{
  let firstPiece = this.board[x1][y1]
  let secondPiece = this.board[x2][y2]
  this.board[x1][y1] = secondPiece
  this.board[x2][y2] = firstPiece
  let results1 = this.checkMatches(x1,y1)
  let results2 = this.checkMatches(x2,y2)
  this.updateGame(results1,results2)
}
start= () => {
  this.board = this.createGameBoard(6,6)
  this.randomizeBoard()
}
}

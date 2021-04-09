
// console.log("I live!") 
export const puzzlePieces = ['red','green','blue','yellow']
export const legalMoveCandidates = []
export const playerInventory = {
  blue: null,
  green: null,
  yellow: null,
}
export const playerHp = 20
export const opponentHp = 20

export const createGameBoard = (x, y) => {
  let board = []
  for( let i = 0 ; i < x ; i++) {
    board.push(new Array(y))
  }
  return board
}


export let board = createGameBoard(6,6)



export const getRandomPiece = () => {
  return puzzlePieces[Math.floor(Math.random()*puzzlePieces.length)]
}


export const checkMatch = (x1, y1, x2, y2) => {
  // is next piece on the board?
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


export const checkNextIn=(x , y, axis, direction) => {
  // 'c' is our constant incrementer/decrementer for the recursive callback chain
  const c = (direction === '+') ? 1 : -1
  // if the next tile on the axis matches: 
  // add direction constant to axis coordinate and check next in line
  // else return this value as the end of the series
  if (axis === 'x') {
    if(checkMatch(x, y, x + c, y)) {
      let xNew = x + c
      // launch recursive callback for next in line
      return checkNextIn(xNew,y,axis,direction)
    } else {
      return x
    }
  }
  else {
    if (checkMatch(x, y, x, y + c)) {
      let yNew = y + c
      // launch recursive callback for next in line
      return checkNextIn(x,yNew,axis,direction)
    } else {
      return y
    }
  }
}


export const checkMatches = (x, y) => {
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
    matchResults.start[j] = checkNextIn(x,y,axis,directions[0])
    matchResults.end[j] = checkNextIn(x,y,axis,directions[1])
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
    matchResults.xMatchColor= xHasMatches ? matchResults.start[0] : null
    matchResults.yMatchColor= yHasMatches ? matchResults.start[0] : null
    matchResults.hasMatches = true
  }

  xHasMatches = matchRanges[0] >= 2
  yHasMatches = matchRanges[1] >= 2
  if (xHasMatches || yHasMatches){
    matchResults.isCandidate = true
  }
  // update match ranges anyway. A series of 2 can be used as
  // candidates to check if the board has legal moves?? Hmm...
  // Might need to create new propery called candidateForMatch
  // and store any that flag true into an array, 
  // instead of checking the entire board. 
  matchResults.xMatchRange = matchRanges[0]
  matchResults.yMatchRange = matchRanges[1]
  // returns object of results 
  return matchResults
}


export const randomizeBoard = () => {
  let x = board.length
  let y = board[0].length
  for(let i = 0 ; i < x ; i++){
    for( let j = 0; j < y ; j++){
      // generate a random piece in place until a piece 
      // that doesn't create a 3 series is generated.
      let isMatching = true
      let matchesFound
      while(isMatching) {
        board[i][j] = getRandomPiece()
        matchesFound = checkMatches(i,j)
        isMatching = matchesFound.hasMatches
      }
      if(matchesFound.isCandidate) {
        legalMoveCandidates.push(matchesFound)
      }
      // succeeding, carry on to next tile
    }
  }
  console.log(board)
}

export const checkBoardHasMoves = () => {
  for(let i = 0; i<=legalMoveCandidates.length; i++) {
    let candidate = legalMoveCandidates[i]
    let xStart = candidate.start[0]
    let yStart = candidate.start[1]
    let xEnd = candidate.end[0]
    let yEnd = candidate.end[1]
    if (candidate.xMatchRange >= 2) {
      let toCheck = candidate.start[0] - 2
      console.log("Checking...",xStart,yStart,toCheck,yStart,checkMatch(xStart,yStart,toCheck,yStart))
      if (checkMatch(xStart,yStart,toCheck,yStart)) {
        return true
      }
      toCheck = candidate.end[0] + 2
      console.log("Checking...",xEnd,yEnd,toCheck,yEnd,checkMatch(xEnd,yEnd,toCheck,yEnd))
      if (checkMatch(xEnd,yEnd,toCheck, yEnd)) {
        return true
      }
    }
    else if (candidate.yMatchRange >= 2) {
      let toCheck = candidate.start[1] - 2
      console.log("Checking...",xStart,yStart,xStart,toCheck,checkMatch(xStart,yStart,xStart,toCheck))
      if (checkMatch(xStart,yStart,xStart,toCheck)) {
        return true
      }
      toCheck = candidate.end[1] + 2
      console.log("Checking...",xEnd,yEnd,xEnd,toCheck,checkMatch(xEnd,yEnd,xEnd,toCheck))
      if (checkMatch(xEnd,yEnd,xEnd, toCheck)) {
        return true
      }
    }
  }
  return false
}
export const setInventory = (matchRange,matchColor) => {
  playerInventory[`${matchColor}`] += matchRange
}
export const updateVitals = (results) => {
  if (results.xMatchRange >=3) {
    if(results.xMatchColor !=='red'){
      setInventory(results.xMatchRange,results.xMatchColor)
    } else {
      updateHp(results.xMatchRange)
    }

  }
  if (results.yMatchRange >=3) {
    if(results.yMatchColor !=='red'){
      setInventory(results.yMatchRange, results.yMatchColor)
    } else{
      updateHp(results.yMatchRange)
    }
  }
}
const updateHp = (matchRange) => {
  let amount = -matchRange
  setPlayerHp(amount,opponentHp)
}
const setPlayerHp = (amount, player) => {
  player += amount 
}
const replacePieces= (results) => {
  for(let i = 0 ; i < results.length ; i++) {

  }
}
const updateGame= (results1,results2) => {
  updateVitals(results1)
  updateVitals(results2)


}
export const swapPieces = (x1,y1,x2,y2) =>{
  let firstPiece = board[x1][y1]
  let secondPiece = board[x2][y2]
  board[x1][y1] = secondPiece
  board[x2][y2] = firstPiece
  let results1 = checkMatches(x1,y1)
  let results2 = checkMatches(x2,y2)
  updateGame(results1,results2)
}

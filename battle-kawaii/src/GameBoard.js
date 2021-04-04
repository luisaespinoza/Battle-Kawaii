
// console.log("I live!") 
const puzzlePieces = ['Red','Green','Blue','Yellow']

const createGameBoard = (x, y) => {
  let board = []
  for( let i = 0 ; i < x ; i++) {
    board.push(new Array(y))
  }
  return board
}


let board = createGameBoard(6,6)



const getRandomPiece = () => {
  return puzzlePieces[Math.floor(Math.random()*puzzlePieces.length)]
}

const checkMatch = (x1, y1, x2, y2) => {
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


const checkNextIn=(x , y, axis, direction) => {
  // 'c' is our constant incrementer/decrementer for the recursive callback chain
  const c = (direction === '+') ? 1 : -1
  // if the next tile on the axis matches: 
  // add direction constant to axis coordinate and check next in line
  // else return this value as the end of the series
  if (axis=== 'x') {
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

const checkMatches = (x, y) => {
  let matchResults = {
    hasMatches: false,
    start: [x,y],
    end:[x,y],
    xMatchRange:null,
    yMatchRange:null,
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
    matchResults.hasMatches = true
  }
  // update match ranges anyway. A series of 2 can be used as
  // candidates to check if the board has legal moves?? Hmm...
  // Might need to create new propery called candidateForMatch
  // and store any that flag true into an array, 
  // instead of checking the entire board. 
  matchResults.xMatchRange = xHasMatches
  matchResults.yMatchRange = yHasMatches
  // returns object of results 
  return matchResults
}

const randomizeBoard = () => {
  let x = board.length
  let y = board[0].length
  for(let i = 0 ; i < x ; i++){
    for( let j = 0; j < y ; j++){
      // generate a random piece in place until a piece 
      // that doesn't create a 3 series is generated.
      let isMatching = true
      while(isMatching) {
        board[i][j] = getRandomPiece()
        let matchesFound = checkMatches(i,j)
        isMatching = matchesFound.hasMatches
      }
      // succeeding, carry on to next tile
    }
  }
}


console.log(board)

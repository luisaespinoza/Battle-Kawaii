
console.log("I live!")
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

  let isXInBounds = ( x2 < board.length && 0 <= x2 )
  if(isXInBounds) {
    let isYInBounds = ( y2 < board[x2].length && 0 <= y2 )
    if(isYInBounds) {
      console.log("(x1,y1) is = ",board[x1][y1])
      console.log("(x2,y2) is = ",board[x2][y2])
      let isNextMatch = (board[x1][y1] === board[x2][y2])
      console.log(isXInBounds,isYInBounds,isNextMatch)
      return isXInBounds && isYInBounds && isNextMatch
    }
  }
  return false
}


const checkNextIn=(x , y, axis, direction) => {
  // 'c' is our constant incrementer/decrementer for the recursive callback chain
  const c = (direction === '+') ? 1 : -1
  if (axis=== 'x') {
    if(checkMatch(x, y, x + c, y)) {
      let xNew = x + c
      console.log("Launching recursive check.", xNew )
      // launch recursive callback for next in line
      return checkNextIn(xNew,y,axis,direction)
    } else {
      return x
    }
  }
  else {
    if (checkMatch(x, y, x, y + c)) {
      let yNew = y + c
      console.log("Launching recursive check.", yNew)
      // launch recursive callback for next in line
      return checkNextIn(x,yNew,axis,direction)
    } else {
      return y
    }
  }
}

const checkMatches = (x, y) => {
  let matchEndPoints = {
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
    matchEndPoints.start[j] = checkNextIn(x,y,axis,directions[0])
    matchEndPoints.end[j] = checkNextIn(x,y,axis,directions[1])
  } 
  console.log(matchEndPoints.start)
  console.log(matchEndPoints.end)

  // check if there are any match series 3 or greater
  let matchResults = matchEndPoints.end.map(function(coordinate,index){
    return coordinate - matchEndPoints.start[index] + 1
  })

  console.log("Match results",matchResults[0],matchResults[1])
  let xHasMatches = matchResults[0] >= 3
  let yHasMatches = matchResults[1] >= 3
  console.log("x has matches: ", xHasMatches, "y has matches: ", yHasMatches)
  if (xHasMatches || yHasMatches){
    matchEndPoints.hasMatches = true
  }
  console.log(matchEndPoints)
  return matchEndPoints
}

const randomizeBoard = () => {
  let x = board.length
  let y = board[0].length
  for(let i = 0 ; i < x ; i++){
    for( let j = 0; j < y ; j++){
      let isMatching = true
      while(isMatching) {
        board[i][j] = getRandomPiece()
        let matchesFound = checkMatches(i,j)
        isMatching = matchesFound.hasMatches
      }
    }
  }
  console.log(board)
}


console.log(board)

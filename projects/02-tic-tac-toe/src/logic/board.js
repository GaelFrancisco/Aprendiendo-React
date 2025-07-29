import { winnerCombinations } from '../constants.js'

export const checkWinnerFrom = (boardToCheck) => {
    // check all the winning combinations
    for (const combo of winnerCombinations) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c] 
    ) {
        return boardToCheck[a] // Return the winner ('x' or 'o')
      }
    }
    return null // No winner found
  }

export const checkEndGame = (newBoard) => {
    // Check if there are no empty squares left
    return newBoard.every((square) => square !== null)
  }
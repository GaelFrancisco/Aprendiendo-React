import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null) // Initialize the board with 9 null values
})

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) // null means no winner yet, false means a draw

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage() // Clear the local storage
  }

  const updateBoard = (index) => {
    // If the square is already filled or the game is over, do nothing
    if (board[index] || winner) return
    // Update the board with the current player's turn
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Switch to the next player's turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // save the new board state
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // Check for a winner
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti() // Trigger confetti if there's a winner
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Set to false if it's a draw
    }
  }

  return (
    <main className='board'>
      <h1 translate='no'>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
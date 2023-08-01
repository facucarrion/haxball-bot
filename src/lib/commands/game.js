export function instantRestart ({ extras: { room } }) {
  room.stopGame()
  setTimeout(() => { room.startGame() }, 10)

  return {
    success: true,
    error: null
  }
}

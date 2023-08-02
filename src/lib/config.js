export const roomConfig = {
  // eslint-disable-next-line key-spacing
  roomName: 'Vénganse a la Verga',
  playerName: '🥂 Facu Bot',
  public: false,
  password: '123',
  maxPlayers: 12,
  token: 'thr1.AAAAAGTKZiedhzSH2SqfjA.tH3551Q3snw',
  noPlayer: true
}

export const adminPassword = Math.floor(Math.random() * 10000).toString()

export function initialConfig (room, { score = 5, time = 10 }) {
  room.setScoreLimit(score)
  room.setTimeLimit(time)
  room.setTeamsLock(true)
  room.setKickRateLimit(6, 0, 0)
}

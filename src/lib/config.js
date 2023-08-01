export const roomConfig = {
  // eslint-disable-next-line key-spacing
  roomName: 'Vénganse a la Verga',
  playerName: '🥂 Facu Bot',
  public: false,
  password: '123',
  maxPlayers: 12,
  token: 'thr1.AAAAAGTHv-3imYQgKYEC8g.rguSqoIz84Y',
  noPlayer: true
}

export const adminPassword = Math.floor(Math.random() * 10000).toString()

export function initialConfig (room, { scoreLimit, timeLimit }) {
  room.setScoreLimit(5)
  room.setTimeLimit(10)
  room.setTeamsLock(true)
  room.setKickRateLimit(6, 0, 0)
}

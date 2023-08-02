import { TEAMS, TEAMS_VALUES } from './constants'

export function endGame (winner, room) {
  const scores = room.getScores()
  console.log(winner, scores)

  room.sendAnnouncement(`🏆 | GANOOOO EL ${TEAMS_VALUES[winner]} | ${scores[TEAMS_VALUES[winner].toLowerCase()]} - ${scores[winner === 1 ? 'blue' : 'red']}`, null, TEAMS[TEAMS_VALUES[winner]].color, 'bold', 2)
}

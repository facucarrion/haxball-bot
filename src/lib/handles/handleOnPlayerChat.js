import { executeCommand, isCommand } from '../commands'
import { TEAMS } from '../constants'

export function handleOnPLayerChat ({
  player,
  message,
  extras: {
    adminPassword,
    room
  }
}) {
  if (isCommand(message).isCommand) {
    if (isCommand.error) {
      room.sendAnnouncement(`Error: ${isCommand.error}`, player.id, 0xFF0000)
    }

    const result = executeCommand({
      command: isCommand(message).command,
      player,
      body: message.split(' ').slice(1).join(' '),
      extras: {
        room,
        adminPassword
      }
    })

    if (result.error) room.sendAnnouncement(`Error: ${result.error}`, player.id, 0xFF0000)
  } else {
    const teamData = Object.values(TEAMS).find(team => team.value === player.team)
    room.sendAnnouncement(`[${teamData.symbol}] ${player.name}: ${message}`, null, teamData.color)
  }
  return false
}

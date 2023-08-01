import { sendCustomAnnouncement } from '../chat'
import { executeCommand, isCommand } from '../commands'
import { FONT_WEIGHT, TEAMS } from '../constants'

export function handleOnPLayerChat ({
  player,
  message,
  extras: {
    adminPassword,
    room
  }
}) {
  const isCommandResult = isCommand(message, player.admin)

  if (isCommandResult.isCommand) {
    if (isCommandResult.error) {
      console.log(isCommandResult.error)
      sendCustomAnnouncement({
        msg: isCommandResult.error,
        variant: 'ERROR',
        target: player.id,
        room
      })
    } else {
      const executeCommandResult = executeCommand({
        command: isCommandResult.command,
        player,
        body: message.split(' ').slice(1).join(' '),
        extras: {
          room,
          adminPassword
        }
      })

      if (executeCommandResult.error) {
        sendCustomAnnouncement({
          msg: executeCommandResult.error,
          variant: 'ERROR',
          target: player.id,
          room
        })
      }
    }
  } else {
    const teamData = Object.values(TEAMS).find(team => team.value === player.team)
    room.sendAnnouncement(`[${teamData.symbol}] ${player.name}: ${message}`, FONT_WEIGHT.ITALIC, teamData.color, 1)
  }

  return false
}

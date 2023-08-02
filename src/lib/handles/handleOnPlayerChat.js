import { sendCustomAnnouncement, sendCustomChat } from '../chat'
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
  const isCommandResult = isCommand(message, player.admin)

  if (isCommandResult.isCommand) {
    if (isCommandResult.error) {
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
    const teamData = Object.values(TEAMS).find(team => {
      if (player?.admin) {
        return team.value === 3
      }
      return team.value === player.team
    })

    sendCustomChat({
      message,
      player,
      teamData,
      extras: {
        room
      }
    })
  }

  return false
}

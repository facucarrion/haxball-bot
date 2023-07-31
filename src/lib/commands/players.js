import { ADMIN_COMMAND_ERRORS } from '../errors'

export const claimAdmCommand = ({
  player,
  body,
  extras
}) => {
  const response = {
    success: false,
    error: null
  }

  if (body !== extras.adminPassword) {
    response.error = ADMIN_COMMAND_ERRORS.INCORRECT_PASSWORD
    return response
  }

  extras.room.setPlayerAdmin(player.id, true)
  extras.room.sendAnnouncement(`El jugador ${player.name} ha reclamado el rol de administrador de la sala.`, null, 0x00FF00)

  return response
}

export const autokick = ({
  player,
  extras
}) => {
  extras.room.kickPlayer(player.id, 'Chau pa! Cuidate.', false)

  return {
    success: false,
    error: null
  }
}

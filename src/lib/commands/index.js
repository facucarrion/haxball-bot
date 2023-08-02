import { ROLES } from '../constants'
import { COMMAND_ERRORS } from '../errors'
import { instantRestart } from './game'
import { autokick, claimAdmCommand } from './players'

const COMMANDS = [
  {
    name: 'claim-admin',
    aliases: ['adm', 'god'],
    roles: [ROLES.PLAYER],
    desc: 'Reclama el rol de administrador de la sala.',
    function: claimAdmCommand
  },
  {
    name: 'autokick',
    aliases: ['bb', 'nv'],
    roles: [ROLES.PLAYER],
    desc: 'Autokick',
    function: autokick
  },
  {
    name: 'restart',
    aliases: ['rr'],
    roles: [ROLES.ADMIN],
    desc: 'Reinicia la sala.',
    function: instantRestart
  }
]

export const findCommand = command => COMMANDS.find(item => item.name === command || item.aliases.includes(command))

export const isCommand = (msg, isAdmin) => {
  const response = {
    isCommand: false,
    command: null,
    error: null
  }

  if (msg[0] !== '!') return response

  response.command = msg.split(' ')[0].substring(1)

  const selectedCommand = findCommand(response.command)

  if (!selectedCommand) {
    response.error = COMMAND_ERRORS.NOT_FOUND
    return response
  }

  if (selectedCommand.roles.includes(ROLES.ADMIN) && !isAdmin) {
    response.error = COMMAND_ERRORS.NOT_ALLOWED
    return response
  }

  response.isCommand = true

  return response
}

export const executeCommand = ({
  command,
  player,
  body,
  extras = {}
}) => findCommand(command).function({
  player,
  body,
  extras
})

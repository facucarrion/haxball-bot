import { ROLES } from '../constants'
import { COMMAND_ERRORS } from '../errors'
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
  }
]

export const findCommand = command => COMMANDS.find(item => item.name === command || item.aliases.includes(command))

export const isCommand = msg => {
  const response = {
    isCommand: false,
    command: null,
    error: null
  }

  if (msg[0] !== '!') return response

  response.isCommand = true

  response.command = msg.split(' ')[0].substring(1)

  const selectedCommand = findCommand(response.command)

  if (!selectedCommand) response.error = COMMAND_ERRORS.NOT_FOUND
  if (selectedCommand.roles.includes(ROLES.PLAYER)) response.error = COMMAND_ERRORS.NOT_ALLOWED

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

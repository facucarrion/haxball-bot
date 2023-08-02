// ROOM DATA

import { sendCustomAnnouncement } from './lib/chat'
import { instantRestart } from './lib/commands/game'
import { adminPassword, initialConfig, roomConfig } from './lib/config'
import { endGame } from './lib/game'
import { handleOnPLayerChat } from './lib/handles/handleOnPlayerChat'

console.log(`Admin password: ${adminPassword}`)

// eslint-disable-next-line no-undef
const room = HBInit(roomConfig)

const limits = {
  score: 1,
  time: 10
}

initialConfig(room, limits)

/* ///////////////// */
/* /  H E L P E R  / */
/* ///////////////// */

const scores = {
  1: 0,
  2: 0
}

/* ///////////////// */
/* /  E V E N T S  / */
/* ///////////////// */

// PLAYER MOVEMENT

room.onPlayerJoin = function (player) {
  sendCustomAnnouncement({
    msg: `Bienvenido ${player.name}!`,
    target: player.id,
    variant: 'WELCOME',
    room
  })
}

room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
}

room.onPlayerLeave = function (player) {
  return false
}

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
  if (!byPlayer) return false
  sendCustomAnnouncement({
    msg: `El jugador ${kickedPlayer.name} ha sido ${ban ? 'BANEADO' : 'KICKEADO'} por ${byPlayer.name}.`,
    variant: 'DANGER',
    room
  })
}

// PLAYER ACTIVITY

room.onPlayerChat = (player, message) => {
  return handleOnPLayerChat({
    player,
    message,
    extras: {
      room,
      adminPassword
    }
  })
}

room.onPlayerActivity = function (player) {
}

room.onPlayerBallKick = function (player) {
}

// GAME MANAGEMENT

room.onGameStart = function (byPlayer) {
}

room.onGameStop = function (byPlayer) {
}

room.onGamePause = function (byPlayer) {
}

room.onGameUnpause = function (byPlayer) {
}

room.onTeamGoal = function (team) {
  scores[team] += 1

  console.log(scores)
  console.log(team)

  if (scores[team] === limits.score) {
    endGame(team, room)
    setTimeout(() => {
      instantRestart({ extras: { room } })
    }, 50)
  }
}

room.onPositionsReset = function () {
}

// MISCELLANEOUS

room.onRoomLink = function (url) {
}

room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
}

room.onStadiumChange = function (newStadiumName, byPlayer) {
}

room.onGameTick = function () {
}

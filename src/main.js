// ROOM DATA

import { sendCustomAnnouncement } from './lib/chat'
import { adminPassword, initialConfig, roomConfig } from './lib/config'
import { handleOnPLayerChat } from './lib/handles/handleOnPlayerChat'

console.log(`Admin password: ${adminPassword}`)

// eslint-disable-next-line no-undef
const room = HBInit(roomConfig)

initialConfig(room, {
  scoreLimit: 5,
  timeLimit: 10
})

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

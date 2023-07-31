// ROOM DATA

import { sendCustomAnnouncement } from './lib/chat'
import { FONT_WEIGHT } from './lib/constants'
import { handleOnPLayerChat } from './lib/handles/handleOnPlayerChat'

const roomConfig = {
  roomName: 'Vénganse a la Verga',
  playerName: '🥂 Facu Bot',
  public: false,
  maxPlayers: 12,
  token: 'thr1.AAAAAGTHv-3imYQgKYEC8g.rguSqoIz84Y',
  noPlayer: true
}

const adminPassword = Math.floor(Math.random() * 10000).toString()

console.log(`Admin password: ${adminPassword}`)

// eslint-disable-next-line no-undef
const room = HBInit(roomConfig)

room.setScoreLimit(5)
room.setTimeLimit(10)
room.setTeamsLock(true)
room.setKickRateLimit(6, 0, 0)

/* ///////////////// */
/* /  E V E N T S  / */
/* ///////////////// */

// PLAYER MOVEMENT

room.onPlayerJoin = function (player) {
  sendCustomAnnouncement({
    msg: player.name,
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
  room.sendAnnouncement(`El jugador ${kickedPlayer.name} ha sido expulsado por ${byPlayer.name}.`, null, FONT_WEIGHT.BOLD, 0xFF0000)
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

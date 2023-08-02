import { COLORS, FONT_WEIGHT, NOTIFICATION } from './constants'

const VARIANTS = {
  NORMAL: {
    color: COLORS.GRAY,
    style: FONT_WEIGHT.NORMAL,
    sound: NOTIFICATION.CHAT,
    msgBuilder: msg => msg
  },
  WELCOME: {
    color: COLORS.GRAY,
    style: FONT_WEIGHT.BOLD,
    sound: NOTIFICATION.CHAT,
    msgBuilder: msg => `👋 | ${msg}`
  },
  DANGER: {
    color: COLORS.RED,
    style: FONT_WEIGHT.BOLD,
    sound: NOTIFICATION.SPECIAL,
    msgBuilder: msg => `👢 | ${msg}`
  },
  ERROR: {
    color: COLORS.RED,
    style: FONT_WEIGHT.BOLD,
    sound: NOTIFICATION.SPECIAL,
    msgBuilder: msg => `❌ | ERROR: ${msg}`
  }
}

export function sendCustomAnnouncement ({
  msg,
  target = null,
  variant = 'NORMAL',
  room
}) {
  const {
    color = COLORS.GRAY,
    style = FONT_WEIGHT.NORMAL,
    sound = NOTIFICATION.CHAT,
    msgBuilder = msg => msg
  } = VARIANTS[variant]

  room.sendAnnouncement(msgBuilder(msg), target, color, style, sound)
}

export function sendCustomChat ({
  message,
  player,
  teamData,
  extras: {
    room
  }
}) {
  const {
    symbol,
    color
  } = teamData

  room.sendAnnouncement(`${symbol} | ${player.name}: ${message}`, null, color, FONT_WEIGHT.BOLD, 1)
}

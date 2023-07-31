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
    msgBuilder: msg => `👋 Bienvenido ${msg}!`
  }
}

export function sendCustomAnnouncement ({
  msg,
  target = null,
  variant = 'NORMAL',
  room
}) {
  const {
    msgBuilder = msg => msg,
    color = COLORS.GRAY,
    style = FONT_WEIGHT.NORMAL,
    sound = NOTIFICATION.CHAT
  } = VARIANTS[variant]

  room.sendAnnouncement(msgBuilder(msg), target, color, style, sound)
}

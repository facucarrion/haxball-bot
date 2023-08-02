export const GAME_STATE = {
  PLAY: 0,
  PAUSE: 1,
  STOP: 2
}

export const ROLES = {
  PLAYER: 0,
  ADMIN: 1,
  MASTER: 2
}

export const NOTIFICATION = {
  NONE: 0,
  CHAT: 1,
  SPECIAL: 2
}

export const FONT_WEIGHT = {
  NORMAL: null,
  BOLD: 'bold',
  ITALIC: 'italic',
  SMALL: 'small',
  SMALL_BOLD: 'small-bold',
  SMALL_ITALIC: 'small-italic'
}

export const COLORS = {
  RED: 0xFF3333,
  BLUE: 0x57D8FF,
  GRAY: 0xADADAD,
  GREEN: 0x8BFF26,
  YELLOW: 0xFFCF4D
}

export const TEAMS = {
  SPECTATOR: {
    value: 0,
    symbol: '👁️',
    color: COLORS.GRAY
  },
  RED: {
    value: 1,
    symbol: '🔴',
    color: COLORS.RED
  },
  BLUE: {
    value: 2,
    symbol: '🔵',
    color: COLORS.BLUE
  },
  ADMIN: {
    value: 3,
    symbol: '👑',
    color: COLORS.YELLOW
  }
}

export const TEAMS_VALUES = {
  0: 'SPECTATOR',
  1: 'RED',
  2: 'BLUE'
}

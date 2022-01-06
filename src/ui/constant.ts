const baseSize = 17;

const scale = 1.25

// https://type-scale.com/
const typography = {
  xs: baseSize / scale / scale,
  sm: baseSize / scale,
  md: baseSize,
  lg: baseSize * scale,
  xl: baseSize * scale * scale,
}

const color = {
  background: "#fff",
  backgroundSecondary: "#ececef",
  backgroundTertiary: "#cdcdd0",
  foreground: "#222225",
  foregroundSecondary: "#444447",
  foregroundTertiary: "#66666a",
}

export { baseSize, typography, color }
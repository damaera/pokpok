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
  backgroundSecondary: "#eef",
  backgroundTertiary: "#ccd",
  foreground: "#223",
  foregroundSecondary: "#445",
  foregroundTertiary: "#667",
}

export { baseSize, typography, color }
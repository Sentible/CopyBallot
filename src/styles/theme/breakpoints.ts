const breakpoint = {
  xs: '320px',
  smAlt: '436px',
  sm: '768px',
  md: '1024px',
  lg: '1200px',
  xl: '1600px',
  xxl: '1925px'
}

const device = {
  xs: `(max-width: ${breakpoint.xs})`,
  smAlt: `(max-width: ${breakpoint.smAlt})`,
  sm: `(max-width: ${breakpoint.sm})`,
  md: `(max-width: ${breakpoint.md})`,
  lg: `(max-width: ${breakpoint.lg})`,
  xl: `(max-width: ${breakpoint.xl})`,
  xxl: `(min-width: ${breakpoint.xxl})`
}

const queries = {
  xs: `@media only screen and ${device.xs}`,
  smAlt: `@media only screen and ${device.smAlt}`,
  sm: `@media only screen and ${device.sm}`,
  md: `@media only screen and ${device.md}`,
  lg: `@media only screen and ${device.lg}`,
  xl: `@media only screen and ${device.xl}`,
  xxl: `@media only screen and ${device.xxl}`
}

export const Breakpoints = { breakpoint, device, queries }

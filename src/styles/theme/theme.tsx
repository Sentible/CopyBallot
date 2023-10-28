import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Breakpoints } from './breakpoints'
import { Colors } from './colors'
import { Shadows } from './shadows'
import { Spacing } from './spacing'
import { Typography } from './typography'

export const theme = {
  Breakpoints,
  Colors,
  Shadows,
  Spacing,
  Typography,
}

type ThemeType = typeof theme
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

const SentibleTheme = ({ children }: { children: React.ReactChild }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default SentibleTheme

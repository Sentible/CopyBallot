import '@/styles/globals.css'
import { StyledApp } from '@/styles/theme'
import SentibleTheme from '@/styles/theme/theme'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SentibleTheme>
      <StyledApp>
        <Component {...pageProps} />
      </StyledApp>
    </SentibleTheme>
  )
}

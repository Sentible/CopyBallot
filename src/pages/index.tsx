import Head from 'next/head'
import styled from 'styled-components'
import styles from '@/styles/Home.module.css'
import Proposals from '@/modules/Proposals'
import Header from '@/modules/Header'
import { HowTo } from '@/modules/HowTo'
import { Footer } from '@/modules/Footer'

const AppWrapper = styled.div`
  .text--headline {
    max-width: 450px;
    text-align: center;
  }

  .text--h1 {
    margin-bottom: 1rem;
    text-align: center;
  }
`

const App = () => {
  return (
    <AppWrapper>
      <Header />
      <HowTo />
      <Proposals />
      <Footer />
    </AppWrapper>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>ProposalClip</title>
        <meta name='description' content='Voting on DIVA proposals the easy for Rocket Pool node operators.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <App />
      </main>
    </>
  )
}

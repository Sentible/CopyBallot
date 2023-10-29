import Head from 'next/head'
import { BlankCard } from '@/components/Card'
import styled from 'styled-components'
import styles from '@/styles/Home.module.css'
import Proposals from '@/modules/Proposals'
import Header from '@/modules/Header'
const StyledCard = styled(BlankCard)`
  align-items: center;
  display: flex;
  justify-content: center;
`

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
      <Proposals />
    </AppWrapper>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>ProposalClip</title>
        <meta
          name='description'
          content='Quickly generate calldata to vote on Diva proposals directly from your Rocket Pool node.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <App />
      </main>
    </>
  )
}

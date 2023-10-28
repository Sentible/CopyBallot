import styled from "styled-components";
import { BlankCard } from "@/components/Card";

const LogoDiv = styled.div`
  background-color: #FFF;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem;
  overflow: hidden;
  width: 100px;

  img {
    width: 100%;
  }
`

const Title = styled.div`
  font-style: italic;
  .subtitle {
    font-size: 10pt;
    margin-top: 0px;
  }
  .title {
    display: block;
    font-size: 26pt;
    line-height: 0.8em;
    margin-bottom: 1rem;
  }
`

const HeaderCard = styled(BlankCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  `

export default function Header() {
  return (
    <HeaderCard>
      <LogoDiv>
        <img alt='ProposalClip' src='/logo.png' />
      </LogoDiv>
      <Title>
        <p className="title">ProposalClip</p>
        <p className="subtitle">
          Vote on Diva proposals from<br />
          your Rocket Pool node.
        </p>
      </Title>
    </HeaderCard>
  )
}

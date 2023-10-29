import styled from "styled-components"
import { BlankCard } from "../Card"
import Text from "../Text"

const StyledCard = styled(BlankCard)`
  color: ${({ theme }) => theme.Colors.black};
  background-color: ${({ theme }) => theme.Colors.white};
  padding: 1rem;
  width: 350px;
  .text--label {
    margin-bottom: 20px;
  }

`

const Content = styled.div`

  .pair {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .code-wrapper {
      width: 200px;
    }

    .text--caption {
      color: #6F828F;
      font-size: 10px !important;
      font-family: system-ui, sans-serif;
    }

  }
  p + p {
    margin-top: 0;
  }
`


const Code = styled(Text)`
  border-radius: 3px;
  padding: 6px;
  font-size: 8px !important;
  font-family: monospace;

  &.calldata {
    background: rgba(118, 140, 255, 0.10);
    color: #768CFF;
  }
  &.contract {
    background: rgba(207, 147, 255, 0.10);
    color: #CF93FF;
  }
`

const CLI_COMMAND = styled(Text)`
      display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 100px;
  border: 1px solid #E7E7E7;
  height: 27px;
  padding: 0 14px;
  color: #333;
  font-family: system-ui, sans-serif;


  p.text--body {
    background: none ;
    font-size: 9px !important;
  }
`

type Props = {
  contractAddress: string
  callData: string
  proposalId: string
}

const CallDataPreview = ({ contractAddress, callData, proposalId }: Props) => {

  return (
    <StyledCard>
      <Text textStyle='label'>Diva Proposal Command Data</Text>
      <Content>
        <div className="pair">
          <Text textStyle='caption'>ADDRESS</Text>
          <div className="code-wrapper">
            <Code className="contract" textStyle="micro">{contractAddress}</Code>
          </div>
        </div>
        <div className="pair">
          <Text textStyle='caption'>PROPOSAL_ID</Text>
          <div className="code-wrapper">
            <Code className="contract" textStyle="micro">{proposalId}</Code>
          </div>
        </div>
        <div className="pair">
          <Text textStyle='caption'>GENERATED_CALLDATA</Text>
          <div className="code-wrapper">
            <Code
              textStyle='micro' className="calldata">{callData}</Code>
          </div>
        </div>
        <CLI_COMMAND textStyle="micro">
          rocketpool node send-message
          <Code className="contract">ADDRESS</Code>
          <Code className="calldata">GENERATED_CALLDATA</Code>
        </CLI_COMMAND>
      </Content>
    </StyledCard>
  )
}

export default CallDataPreview

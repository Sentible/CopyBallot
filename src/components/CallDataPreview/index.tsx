import styled from 'styled-components'
import { BlankCard } from '../Card'
import Text from '../Text'
import Button from '../Button'

const StyledCard = styled(BlankCard)`
  color: ${({ theme }) => theme.Colors.black};
  display: flex;
  flex-direction: column;
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
      color: #6f828f;
      font-size: 10px !important;
      font-family: system-ui, sans-serif;
    }
  }
  p + p {
    margin-top: 0 !important;
  }
`

const Code = styled(Text)`
  border-radius: 3px;
  padding: 6px;
  font-size: 8px !important;
  font-family: monospace;

  &.calldata {
    background: rgba(118, 140, 255, 0.1);
    color: #768cff;
  }
  &.contract {
    background: rgba(207, 147, 255, 0.1);
    color: #cf93ff;
  }
`

const CLI_COMMAND = styled(Text)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #e7e7e7;
  height: 27px;
  padding: 0 14px;
  color: #333;
  font-family: system-ui, sans-serif;

  p.text--body {
    background: none;
    font-size: 9px !important;
  }
`

const CopyButton = styled(Button)`
  && {
    align-self: flex-end;
    background: #000;
    border-radius: 100px;
    border: none;
    color: #fff;
    margin-top: 1rem;
    padding: 4px 5px;
    width: 108px;
    p {
      font-family: system-ui, sans-serif;
      font-size: 9px !important;
      font-weight: 500 !important;
    }
  }

  &&:hover,
  &&:hover:not(:disabled) {
    background: #000;
  }

  svg {
    position: relative;
    left: -1px;
    top: 5px;
  }
  p {
    position: relative;
    top: -3px;
  }
`

const CopyIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='13' height='13' viewBox='0 0 13 13' fill='none'>
    <path
      d='M8.53125 8.53125H10.9688V2.03125H4.46875V4.46875'
      stroke='#FFFA8A'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M8.53125 4.46875H2.03125V10.9688H8.53125V4.46875Z'
      stroke='#FFFA8A'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)

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
        <div className='pair'>
          <Text textStyle='caption'>ADDRESS</Text>
          <div className='code-wrapper'>
            <Code className='contract' textStyle='micro'>
              {contractAddress}
            </Code>
          </div>
        </div>
        <div className='pair'>
          <Text textStyle='caption'>PROPOSAL_ID</Text>
          <div className='code-wrapper'>
            <Code className='contract' textStyle='micro'>
              {proposalId}
            </Code>
          </div>
        </div>
        <div className='pair'>
          <Text textStyle='caption'>GENERATED_CALLDATA</Text>
          <div className='code-wrapper'>
            <Code textStyle='micro' className='calldata'>
              {callData}
            </Code>
          </div>
        </div>
        <CLI_COMMAND textStyle='micro'>
          rocketpool node send-message
          <Code className='contract'>ADDRESS</Code>
          <Code className='calldata'>GENERATED_CALLDATA</Code>
        </CLI_COMMAND>
      </Content>
      <CopyButton>
        <Text textStyle='micro'>
          <CopyIcon />
          Copy Command
        </Text>
      </CopyButton>
    </StyledCard>
  )
}

export default CallDataPreview

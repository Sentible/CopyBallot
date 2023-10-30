import styled from 'styled-components'
import { BlankCard } from '../Card'
import Text from '../Text'
import Button from '../Button'
import { useCallback, useState } from 'react'
import { CastVote } from '../CastVote'
import copy from 'copy-to-clipboard'

const StyledCard = styled(BlankCard)<{
  isOpen?: boolean
}>`
  background-color: ${({ theme }) => theme.Colors.pureWhite};
  border-radius: 10px;
  box-shadow: none;
  color: ${({ theme }) => theme.Colors.black};
  display: flex;
  flex-direction: column;
  margin: 0;
  max-width: 535px;
  padding: 0 2rem 0;
  transition: all 0.5s ease-in;
  opacity: 0;
  word-wrap: break-word;

  ${({ isOpen }) =>
    isOpen
      ? `
      height: 430px;
      visibility: visible;
      opacity: 1;

  `
      : `
      height: 0;
      visibility: hidden;

  `}
  ${({ theme }) => theme.Breakpoints.queries.smAlt} {
    ${({ isOpen }) =>
      isOpen
        ? `
      height: 570px;
      opacity: 1;
      visibility: visible;
  `
        : `
      height: 0;
      visibility: hidden;

  `}
  }

  .card-title {
    margin-bottom: 20px;
  }
`

const CLI_COMMAND = styled(Text)`
  align-items: center;
  background: ${({ theme }) => theme.Colors.lightGrey};
  border-radius: 100px;
  border: 1px solid #e7e7e7;
  color: #333;
  display: flex;
  font-family: system-ui, sans-serif;
  font-size: 14px !important;
  height: 27px;
  justify-content: space-evenly;
  padding: 0 14px;

  p.text--body {
    background: none;
    font-size: 14px !important;
  }

  > span.contract,
  span.calldata {
    padding: 0;
    background: none;
  }
`

const Content = styled.div`
  margin-top: 1.5rem;

  .pair {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.25rem;

    ${({ theme }) => theme.Breakpoints.queries.smAlt} {
      align-items: flex-start;
      flex-direction: column;

      .code-wrapper {
        margin-left: 0 !important;
        margin-top: 0.5rem;
        width: 290px !important;
      }
    }

    .code-wrapper {
      margin-left: 0.5rem;
      width: 356px;
    }

    .text--caption {
      color: #6f828f;
      font-size: 14px !important;
      font-family: system-ui, sans-serif;
      width: 90px;
    }
  }
  p + p {
    margin-top: 0 !important;
  }
  ${({ theme }) => theme.Breakpoints.queries.smAlt} {
    .cli-command {
      display: flex;
      flex-flow: row wrap;
      height: auto;
    }
  }
`

const Code = styled(Text)`
  border-radius: 6px;
  padding: 1rem;
  font-size: 14px !important;
  font-family: monospace;

  &.calldata {
    background: rgba(118, 140, 255, 0.1);
    color: #768cff;
  }
  &.contract {
    background: rgba(207, 147, 255, 0.1);
    color: #cf93ff;
    cursor: pointer;
  }
`

const CopyButton = styled(Button)`
  && {
    align-self: flex-end;
    background: #000;
    border-radius: 100px;
    border: none;
    color: #fff;
    margin-top: 2rem;
    padding: 8px;
    width: 165px;
    p {
      font-family: system-ui, sans-serif;
      font-size: 14px !important;
      font-weight: 500 !important;
    }
  }

  &&:hover,
  &&:hover:not(:disabled) {
    background: #000;
  }

  svg {
    position: relative;
    &.copy {
      margin-right: 5px;
      top: 4px;
    }

    &.check {
      left: -2px;
      top: 2px;
    }
  }
  p {
    position: relative;
    top: -2px;
  }
`

const CopyIcon = () => (
  <svg className='copy' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 13 13' fill='none'>
    <path
      d='M8.53125 8.53125H10.9688V2.03125H4.46875V4.46875'
      stroke='#FFFA8A'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M8.53125 4.46875H2.03125V10.9688H8.53125V4.46875Z'
      stroke='#FFFA8A'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
const CheckIcon = () => (
  <svg className='check' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 12 12' fill='none'>
    <path
      d='M10.125 3.375L4.875 8.625L2.25 6'
      stroke='#27FEB1'
      stroke-width='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

type Props = {
  contractAddress: string
  callData: string
  children?: React.ReactNode
  isOpen?: boolean
}

const CallDataPreview = ({ contractAddress, children, callData, isOpen }: Props) => {
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(() => {
    try {
      copy(`rocketpool node send-message ${contractAddress} ${callData}`)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch (error) {}
  }, [contractAddress, callData])

  const openEtherscanLink = useCallback(() => {
    window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')
  }, [contractAddress])

  return (
    <StyledCard isOpen={isOpen}>
      {children}
      <Content>
        <div className='pair'>
          <Text textStyle='caption'>CONTRACT</Text>
          <div className='code-wrapper'>
            <Code className='contract' onClick={openEtherscanLink} textStyle='micro'>
              {contractAddress}
            </Code>
          </div>
        </div>
        <div className='pair'>
          <Text textStyle='caption'>CALLDATA</Text>
          <div className='code-wrapper'>
            <Code textStyle='micro' className='calldata'>
              {callData}
            </Code>
          </div>
        </div>
        <CLI_COMMAND className='cli-command' textStyle='micro'>
          <code>rocketpool node send-message</code>
          <Code tag='span' className='contract' onClick={openEtherscanLink}>
            CONTRACT
          </Code>
          <Code tag='span' className='calldata'>
            CALLDATA
          </Code>
        </CLI_COMMAND>
      </Content>
      <CopyButton onClick={onCopy}>
        <Text textStyle='micro'>
          {copied ? (
            <>
              <CheckIcon />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon />
              Copy Command
            </>
          )}
        </Text>
      </CopyButton>
    </StyledCard>
  )
}

export default CallDataPreview

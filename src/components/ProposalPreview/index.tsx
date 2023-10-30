import { Proposal } from '@/utils/types'
import styled from 'styled-components'
import Card from '../Card'
import { getTallyLink, getTitle } from '@/utils'
import { useMemo, useState } from 'react'
import Text from '../Text'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ProposalCard } from '@/modules/Proposals'

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0;
  overflow: hidden;
  box-shadow: 2px 2px 10px 0px #a39191;

  & + & {
    margin-top: 1.5rem;
  }

  .proposal-header,
  .description,
  .actions p {
    padding: 1rem;
  }

  .proposal-header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.Colors.mediumSilver};
  }

  .logo {
    height: 30px;
    margin-right: 0.5rem;

    img {
      height: 100%;
    }
  }

  .description {
    /* max-width: 350px; */
    overflow-wrap: break-word;
    a {
      text-decoration: underline white;
    }
    /* max-width: 425px;
  overflow: hidden;
  position: relative;
  word-wrap: break-word;

  p + h2,
  h1 + p,
  p + p,
  h2 + p {
    margin-top: 1rem;
    word-wrap: break-word;
  }

  code {
    white-space: pre-wrap;
  }

  img {
    width: 100%;
  } */
  }

  .actions {
    border-top: 1px solid ${({ theme }) => theme.Colors.mediumSilver};
    text-align: center;
    width: 100%;

    &.hidden {
      display: none;
    }

    &:hover {
      background: ${({ theme }) => theme.Colors.mediumSilver};
    }
    p {
      cursor: pointer;
    }
  }
`

export const ProposalPreview = ({ proposal }: { proposal: Proposal }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { img, title } = useMemo(() => {
    return {
      img: proposal?.governance?.organization?.visual?.icon,
      title: getTitle(proposal.description),
    }
  }, [proposal])

  return (
    <StyledCard>
      <div className='proposal-header'>
        <div className='logo'>
          <img src={img} alt='logo' />
        </div>
        <div className='title'>
          <Text textStyle='h5'>{title}</Text>
        </div>
      </div>
      <div className='description'>
        <Text className='view-link' textStyle='h6'>
          View Proposal on Tally
        </Text>
        <Text tag='a' target='_blank' href={getTallyLink(proposal.id)} textStyle='caption'>
          {proposal.id}
        </Text>
        {/* <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown> */}
      </div>
      <div className={isOpen ? 'actions hidden' : 'actions'}>
        <Text onClick={() => setIsOpen(!isOpen)} textStyle='h6'>
          GENERATE VOTE
        </Text>
      </div>
      <ProposalCard proposal={proposal} isOpen={isOpen} />
    </StyledCard>
  )
}

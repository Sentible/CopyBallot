import { Proposal } from '@/utils/types'
import styled from 'styled-components'
import Card from '../Card'
import { getTallyLink, getTitle } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import Text from '../Text'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ProposalCard } from '@/modules/Proposals'

const StyledCard = styled(Card)`
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 535px;
  overflow: hidden;
  padding: 0;
  border-radius: 2rem;

  & + & {
    margin-top: 2rem;
  }

  .proposal-header,
  .description,
  .actions p {
    padding: 2rem;
  }

  .proposal-header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.Colors.mediumSilver};
  }

  .logo {
    height: 40px;
    margin-right: 1rem;

    img {
      height: 100%;
      border-radius: 100%;
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

export const ProposalPreview = ({
  activeProposal,
  proposal,
  setActiveProposal,
}: {
  activeProposal?: string
  proposal: Proposal
  setActiveProposal: (id: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const { img, title } = useMemo(() => {
    return {
      img: proposal?.governance?.organization?.visual?.icon,
      title: getTitle(proposal.description),
    }
  }, [proposal])

  useEffect(() => {
    if (activeProposal === proposal.id) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [activeProposal, proposal.id])

  return (
    <StyledCard>
      <div className='proposal-header'>
        <div className='logo'>
          <img src={img} alt='logo' />
        </div>
        <div className='title'>
          <Text textStyle='h3'>{title}</Text>
        </div>
      </div>
      <div className='description'>
        <Text className='view-link' textStyle='h4'>
          View Proposal on Tally
        </Text>
        <Text tag='a' target='_blank' href={getTallyLink(proposal.id)} textStyle='h5'>
          {proposal.id}
        </Text>
        {/* <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown> */}
      </div>
      <div className={isOpen ? 'actions hidden' : 'actions'}>
        <Text
          onClick={() => {
            setIsOpen(true)
            setActiveProposal(proposal.id)
          }}
          textStyle='h4'
        >
          GENERATE VOTE
        </Text>
      </div>
      <ProposalCard proposal={proposal} isOpen={isOpen} />
    </StyledCard>
  )
}

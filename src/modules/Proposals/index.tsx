import Card from '@/components/Card'
import { Proposals, Proposal } from '@/utils/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Button from '@/components/Button'
import Text from '@/components/Text'

const isActive = (proposal: Proposal) => {
  const status = new Set(proposal.statusChanges.map(({ type }) => type))

  const hasActive = status.has('ACTIVE')
  const hasPending = status.has('PENDING')
  const hasExecuted = status.has('EXECUTED')

  return hasActive && hasPending && !hasExecuted
}

const ShowMoreContainer = styled.div`
  align-items: center;
  bottom: 0;
  right: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  position: absolute;
  width: 100%;
  color: #000;

  background: linear-gradient(180deg, #ffffffdb 0%, #bbbbbbeb 100%);
  height: 100px;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
`

const ProposalCard = styled(Card)<{
  isExpanded?: boolean
}>`
  max-width: 425px;
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
  }

  ${({ isExpanded }) =>
    `
    height: ${isExpanded ? 'auto' : '400px'};
    ${ShowMoreContainer} {
      display: ${isExpanded ? 'none' : 'flex'};
    }

  `}
`

const Proposal = ({ proposal }: { proposal: Proposal }) => {
  const { description } = proposal

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <ProposalCard isExpanded={isExpanded}>
      <ShowMoreContainer>
        <Text textStyle='label' onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </Text>
      </ShowMoreContainer>
      <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
    </ProposalCard>
  )
}

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposals>([])

  const getData = useCallback(async () => {
    try {
      const revalidatedData = await fetch('/api/tally', {
        next: { revalidate: 10 },
        method: 'POST'
      })
      const data = ((await revalidatedData.json()) as { proposals: Proposals })
        ?.proposals
      console.log({ data })
      setProposals(data)
      return data
    } catch (error) {
      return []
    }
  }, [])

  const { active, inActive } = useMemo(() => {
    const active: Proposals = []
    const inActive: Proposals = []
    proposals.forEach((proposal) => {
      if (isActive(proposal)) {
        active.push(proposal)
      } else {
        inActive.push(proposal)
      }
    })
    return { active, inActive }
  }, [proposals])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div>
      {!!active?.length && (
        <div>
          <Text textStyle='h1'>Active Proposals</Text>
          {active.map((proposal) => (
            <Proposal proposal={proposal} key={proposal.id} />
          ))}
        </div>
      )}
      {!!inActive?.length && (
        <div>
          <Text textStyle='h1'>Past Proposals</Text>
          {inActive.map((proposal) => (
            <Proposal proposal={proposal} key={proposal.id} />
          ))}
        </div>
      )}
    </div>
  )
}

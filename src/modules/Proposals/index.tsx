import Card from '@/components/Card'
import { Proposals, Proposal } from '@/utils/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Text from '@/components/Text'
import { Interface } from 'ethers'
import CallDataPreview from '@/components/CallDataPreview'

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
  height: 50px;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
`

const ProposalCard = styled(Card) <{
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

const getVote = (id: string, vote: '0' | '1') =>
  new Interface(['function castVote(uint256 proposalId, uint8 support)']).encodeFunctionData('castVote', [id, vote])

const Proposal = ({ proposal }: { proposal: Proposal }) => {
  const { description, governance, id } = proposal

  const [isExpanded, setIsExpanded] = useState(false)

  const againstCallData = useMemo(() => getVote(id, '0'), [id])
  const forCallData = useMemo(() => getVote(id, '1'), [id])

  const contractAddress = useMemo(() => governance.id.split(':')?.slice(-1)?.[0], [governance])

  console.log(id, proposal)

  if (!description?.length) {
    return null
  }

  return (
    <ProposalCard isExpanded={isExpanded}>
      {/* <ShowMoreContainer>
        <Text textStyle='label' onClick={() => setIsExpanded(!isExpanded)}>
          Get Command
        </Text>
      </ShowMoreContainer>
      <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown> */}
      {!isExpanded && (
        <>
          <CallDataPreview callData={forCallData} contractAddress={contractAddress} proposalId={id} />
          <Card>
            <Text textStyle='label'>AGAINST the proposal</Text>
            <code>{`rocketpool node send-message 0xfb6b7c11a55c57767643f1ff65c34c8693a11a70 ${againstCallData}`}</code>
          </Card>
        </>
      )}
    </ProposalCard>
  )
}

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposals>([])

  const getData = useCallback(async () => {
    try {
      const revalidatedData = await fetch('/api/tally', {
        next: { revalidate: 10 },
        method: 'POST',
      })
      const data = ((await revalidatedData.json()) as { proposals: Proposals })?.proposals
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

import { useCallback, useEffect, useMemo, useState } from 'react'

import { CastVote } from '@/components/CastVote'
import type { Proposals, Proposal } from '@/utils/types'
import CallDataPreview from '@/components/CallDataPreview'
import Text from '@/components/Text'
import { ProposalPreview } from '@/components/ProposalPreview'
import { getVote, getTitle } from '@/utils'

const isActive = (proposal: Proposal) => {
  const status = new Set(proposal.statusChanges.map(({ type }) => type))

  const hasActive = status.has('ACTIVE')
  const hasPending = status.has('PENDING')
  const hasExecuted = status.has('EXECUTED')
  const isExpired = status.has('EXPIRED')

  return hasActive && hasPending && !hasExecuted && !isExpired
}

const isPendingOnly = (proposal: Proposal) => {
  const status = new Set(proposal.statusChanges.map(({ type }) => type))

  const hasActive = status.has('ACTIVE')
  const hasPending = status.has('PENDING')
  const hasExecuted = status.has('EXECUTED')
  const isExpired = status.has('EXPIRED')

  return !hasActive && hasPending && !hasExecuted && !isExpired
}

export const ProposalCard = ({ proposal, isOpen = false }: { proposal: Proposal; isOpen?: boolean }) => {
  const { description, governance, id } = proposal

  const [castedVote, setCastedVote] = useState<'0' | '1'>('1')

  const contractAddress = useMemo(() => governance.id.split(':')?.slice(-1)?.[0], [governance])
  const callData = useMemo(() => getVote(id, castedVote), [id, castedVote])
  const openTallyLink = useCallback(() => {
    window.open(`https://www.tally.xyz/gov/diva/proposal/${id}`, '_blank')
  }, [id])
  const title = useMemo(() => getTitle(description), [description])

  if (!description?.length) {
    return null
  }

  return (
    <CallDataPreview isOpen={isOpen} callData={callData} contractAddress={contractAddress}>
      <CastVote castVote={setCastedVote} onTally={openTallyLink} selected={castedVote} />
    </CallDataPreview>
  )
}

export default function Proposals() {
  const [activeProposal, setActiveProposal] = useState<string>()
  const [proposals, setProposals] = useState<Proposals>([])

  const getData = useCallback(async () => {
    try {
      const revalidatedData = await fetch('/api/tally', {
        next: { revalidate: 10 },
        method: 'POST',
      })
      const data = ((await revalidatedData.json()) as { proposals: Proposals })?.proposals
      setProposals(data)
      return data
    } catch (error) {
      return []
    }
  }, [])

  const { active, inActive, pending } = useMemo(() => {
    const active: Proposals = []
    const inActive: Proposals = []
    const pending: Proposals = []
    proposals.forEach((proposal) => {
      if (isActive(proposal)) {
        active.push(proposal)
      } else if (isPendingOnly(proposal)) {
        pending.push(proposal)
      } else {
        inActive.push(proposal)
      }
    })
    return { active, inActive, pending }
  }, [proposals])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '95vw',
      }}
    >
      {!!pending?.length && (
        <div
          style={{
            width: '100%',
          }}
        >
          <span
            style={{
              color: 'black',
            }}
          >
            <Text textStyle='h1'>Pending Diva Proposals</Text>
          </span>
          {pending.map((proposal) => (
            <ProposalPreview
              activeProposal={activeProposal}
              proposal={proposal}
              key={proposal.id}
              setActiveProposal={setActiveProposal}
            />
          ))}
        </div>
      )}
      {!!active?.length && (
        <div
          style={{
            width: '100%',
          }}
        >
          <span
            style={{
              color: 'black',
            }}
          >
            <Text textStyle='h1'>Active Diva Proposals</Text>
          </span>
          {active.map((proposal) => (
            <ProposalPreview
              activeProposal={activeProposal}
              proposal={proposal}
              key={proposal.id}
              setActiveProposal={setActiveProposal}
            />
          ))}
        </div>
      )}
      {!!inActive?.length && (
        <div
          style={{
            width: '100%',
          }}
        >
          <span
            style={{
              color: 'black',
            }}
          >
            <Text textStyle='h1'>Past Diva Proposals</Text>
          </span>
          {inActive.map((proposal) => (
            <ProposalPreview
              activeProposal={activeProposal}
              proposal={proposal}
              key={proposal.id}
              setActiveProposal={setActiveProposal}
            />
          ))}
        </div>
      )}
    </div>
  )
}

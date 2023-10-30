import { useCallback, useEffect, useMemo, useState } from 'react'

import { CastVote } from '@/components/CastVote'
import { Proposals, Proposal } from '@/utils/types'
import CallDataPreview from '@/components/CallDataPreview'
import Text from '@/components/Text'
import { ProposalPreview } from '@/components/ProposalPreview'
import { getVote, getTitle } from '@/utils'

const isActive = (proposal: Proposal) => {
  const status = new Set(proposal.statusChanges.map(({ type }) => type))

  const hasActive = status.has('ACTIVE')
  const hasPending = status.has('PENDING')
  const hasExecuted = status.has('EXECUTED')

  return hasActive && hasPending && !hasExecuted
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
    <div
      style={{
        width: '95w',
      }}
    >
      {!!active?.length && (
        <div>
          <span
            style={{
              color: 'black',
            }}
          >
            <Text textStyle='h1'>Active Diva Proposals</Text>
          </span>
          {active.map((proposal) => (
            <ProposalPreview proposal={proposal} key={proposal.id} />
          ))}
        </div>
      )}
      {!!inActive?.length && (
        <div>
          <span
            style={{
              color: 'black',
            }}
          >
            <Text textStyle='h1'>Past Diva Proposals</Text>
          </span>
          {inActive.map((proposal) => (
            <ProposalPreview proposal={proposal} key={proposal.id} />
          ))}
        </div>
      )}
    </div>
  )
}

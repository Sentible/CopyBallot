import Card from "@/components/Card"
import { Proposals, Proposal } from "@/utils/types"
import { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const isActive = (proposal: Proposal) => {
  const status = new Set(proposal.statusChanges.map(({ type }) => type))

  const hasActive = status.has('ACTIVE')
  const hasPending = status.has('PENDING')
  const hasExecuted = status.has('EXECUTED')

  return hasActive && hasPending && !hasExecuted
}

const Proposal = styled(Card)`
  word-wrap: break-word;
  max-width: 400px;

  p + h2, h1 + p, p + p, h2 + p{
    margin-top: 1rem;
    word-wrap: break-word;
  }

  code {
    white-space: pre-wrap;
  }


  img {
    width: 100%;
  }
`

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposals>([])

  const getData = useCallback(async () => {
    try {
      const revalidatedData = await fetch('/api/tally', {
        next: { revalidate: 10 },
        method: 'POST'
      })
      const data = (await revalidatedData.json() as { proposals: Proposals })?.proposals
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
    proposals.forEach(proposal => {
      if (isActive(proposal)) {
        active.push(proposal)
      } else {
        inActive.push(proposal)
      }
    })
    return { active, inActive }
  }, [proposals])

  console.log({ active, inActive })

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div>
      {inActive.map(proposal => (
        <Proposal key={proposal.id}>
          <Markdown remarkPlugins={[remarkGfm]}>{(proposal.description)}</Markdown>
        </Proposal>
      ))}
    </div>
  )
}

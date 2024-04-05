export interface StatusChange {
  type: 'ACTIVE' | 'PENDING' | 'EXECUTED' | 'EXPIRED' | 'SUCCEEDED' | 'QUEUED'

}
export interface Block {
  timestamp: string
}
export interface VoteStat {
  votes: string
  weight: string
  support: string
  percent: number
}
export interface Metadata {
  icon: string
}
export interface Organization {
  metadata: Metadata
}
export interface Token {
  decimals: number
}
export interface Governance {
  id: string
  quorum: string
  name: string
  timelockId: string
  organization: Organization
  tokens: Token[]
}
export interface TallyProposal {
  id: string
  createdAt: string
  status: string
}
export interface Proposal {
  id: string
  description: string
  statusChanges: StatusChange[]
  block: Block
  voteStats: VoteStat[]
  governance: Governance
  tallyProposal: TallyProposal
}

export type Proposals = Proposal[]


export interface StatusChange {
  type: string;
}
export interface Block {
  timestamp: string;
}
export interface VoteStat {
  votes: string;
  weight: string;
  support: string;
  percent: number;
}
export interface Visual {
  icon: string;
}
export interface Organization {
  visual: Visual;
}
export interface Token {
  decimals: number;
}
export interface Governance {
  id: string;
  quorum: string;
  name: string;
  timelockId: string;
  organization: Organization;
  tokens: Token[];
}
export interface TallyProposal {
  id: string;
  createdAt: string;
  status: string;
}
export interface Proposal {
  id: string;
  description: string;
  statusChanges: StatusChange[];
  block: Block;
  voteStats: VoteStat[];
  governance: Governance;
  tallyProposal: TallyProposal;
}

export type Proposals = Proposal[]

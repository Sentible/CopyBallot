import { Interface } from 'ethers'

export const getVote = (id: string, vote: '0' | '1') =>
  new Interface(['function castVote(uint256 proposalId, uint8 support)']).encodeFunctionData('castVote', [id, vote])

export const getTitle = (markdown: string) => {
  const title = markdown.split('\n')[0]
  return title.replace('# ', '')
}

export const getTallyLink = (id: string) => `https://www.tally.xyz/gov/diva/proposal/${id}`

export const openTallyLink = (id: string) => {
  window.open(getTallyLink(id), '_blank')
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const getData = await fetch('https://api.tally.xyz/query', {
    headers: {
      'api-key':
        '365b418f59bd6dc4a0d7f23c2e8c12d982f156e9069695a6f0a2dcc3232448df',
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: '{"query":"\\n    query GovernanceProposals($sort: ProposalSort, $chainId: ChainID!, $pagination: Pagination, $governanceIds: [AccountID!], $proposerIds: [AccountID!], $voters: [Address!], $votersPagination: Pagination, $includeVotes: Boolean!) {\\n  proposals(\\n    sort: $sort\\n    chainId: $chainId\\n    pagination: $pagination\\n    governanceIds: $governanceIds\\n    proposerIds: $proposerIds\\n  ) {\\n    id\\n    description\\n    statusChanges {\\n      type\\n    }\\n    block {\\n      timestamp\\n    }\\n    voteStats {\\n      votes\\n      weight\\n      support\\n      percent\\n    }\\n    votes(voters: $voters, pagination: $votersPagination) @include(if: $includeVotes) {\\n      support\\n      voter {\\n        name\\n        picture\\n        address\\n        identities {\\n          twitter\\n        }\\n      }\\n    }\\n    governance {\\n      id\\n      quorum\\n      name\\n      timelockId\\n      organization {\\n        visual {\\n          icon\\n        }\\n      }\\n      tokens {\\n        decimals\\n      }\\n    }\\n    tallyProposal {\\n      id\\n      createdAt\\n      status\\n    }\\n  }\\n}\\n    ","variables":{"pagination":{"limit":10,"offset":0},"sort":{"field":"START_BLOCK","order":"DESC"},"chainId":"eip155:1","governanceIds":["eip155:1:0xFb6B7C11a55C57767643F1FF65c34C8693a11A70"],"votersPagination":{"limit":1,"offset":0},"includeVotes":false}}',
    method: 'POST',
    mode: 'cors',
    credentials: 'omit'
  }).then((response) => response.json())

  const proposals = getData.data.proposals
  res.send({ proposals } as any)
}

import { BlankCard } from '@/components/Card'
import Text from '@/components/Text'
import styled from 'styled-components'

const Wrapper = styled(BlankCard)`
  color: ${({ theme }) => theme.Colors.black};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto 4rem;
  padding-top: 0;
  width: 365px;
`

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  .label {
    margin-bottom: 1rem;
    padding-left: 0.5rem;
    text-decoration: underline;
  }

  .bold {
    font-weight: 700 !important;
    font-style: italic;
  }

  li {
    margin-bottom: 1rem;
    padding-left: 0.5rem;
    position: relative;

    &:before {
      background-color: ${({ theme }) => theme.Colors.black};
      border-radius: 50%;
      content: '';
      display: block;
      height: 0.5rem;
      left: -1rem;
      position: absolute;
      top: 0.5rem;
      width: 0.5rem;
    }
  }

  .credits {
    color: ${({ theme }) => theme.Colors.grey};
    padding-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`

const STEPS = [
  {
    label: 'Browse',
    value: 'View proposals and click "Generate Vote" to see voting calldata.',
  },
  {
    label: 'Determine Your Vote',
    value: 'Select "Yes" or "No".',
  },
  {
    label: 'Copy & Paste',
    value: 'Copy the calldata and paste it in the RocketPool CLI.',
  },
]

export const HowTo = () => {
  return (
    <Wrapper>
      <List>
        <Text className='label' textStyle='label'>
          How to use
        </Text>
        {STEPS.map((step) => (
          <li key={step.value}>
            <Text textStyle='h6'>
              {step.label && (
                <Text textStyle='h6' tag='span' className='bold'>
                  {step.label}:{' '}
                </Text>
              )}
              {step.value}
            </Text>
          </li>
        ))}
        <Text
          tag='a'
          href='https://majestyle.medium.com/diva-voting-from-rocketpool-node-7124118b45e0'
          target='_blank'
          textStyle='caption'
          className='credits'
        >
          * Note: Based on notes by @Peteris and Majes.
        </Text>
      </List>
    </Wrapper>
  )
}

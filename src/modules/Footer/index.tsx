import { BlankCard } from '@/components/Card'
import Text from '@/components/Text'
import styled from 'styled-components'

const Wrapper = styled(BlankCard)`
  color: ${({ theme }) => theme.Colors.black};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 365px;
  margin: 6rem auto 0;
  text-align: center;
`

export const Footer = () => {
  return (
    <Wrapper>
      <div>
        <Text
          tag='a'
          href='https://twitter.com/Sentibleapp'
          target='_blank'
          textStyle='boldCaption'
        >
          ⚒️ by sentible.xyz
        </Text>
      </div>
    </Wrapper>
  )
}

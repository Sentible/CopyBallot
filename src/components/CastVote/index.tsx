import styled from 'styled-components'
import Text from '../Text'

const Wrapper = styled.div`
  margin: 0px -32px;
  background: ${({ theme }) => theme.Colors.darkSilver};
  color: white;
  padding-top: 1rem;
  /* border-radius: 10px 10px 0 0; */
  margin-bottom: 10px;
  > p {
    margin: -8px 0 8px;
    /* cursor: pointer; */
    text-align: center;
    padding: 0.3rem;
  }

  .options {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-top: 1px solid;

    .option {
      align-items: center;
      color: ${({ theme }) => theme.Colors.white};
      cursor: pointer;
      display: flex;
      justify-content: center;
      width: 50%;
      padding: 0.4rem;

      h4 {
        height: auto;
        text-align: center;
      }

      svg {
        position: relative;
        top: 2px;
        left: -4px;
      }

      &.yes {
        &.selected,
        &:hover {
          background: rgba(40, 225, 92, 0.75);
        }
        border-right: 1px solid;
      }

      &.no {
        &.selected,
        &:hover {
          background: rgba(253, 127, 99, 0.75);
        }
      }
    }
  }
`
const YesIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 13 13' fill='none'>
    <path
      d='M1.625 5.28125H4.0625V10.5625H1.625C1.51726 10.5625 1.41392 10.5197 1.33774 10.4435C1.26155 10.3673 1.21875 10.264 1.21875 10.1562V5.6875C1.21875 5.57976 1.26155 5.47642 1.33774 5.40024C1.41392 5.32405 1.51726 5.28125 1.625 5.28125V5.28125Z'
      stroke='#28E15C'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M4.0625 5.28125L6.09375 1.21875C6.52473 1.21875 6.93805 1.38995 7.2428 1.6947C7.54754 1.99945 7.71875 2.41277 7.71875 2.84375V4.0625H10.8621C10.9773 4.06222 11.0912 4.08659 11.1963 4.13398C11.3013 4.18138 11.3949 4.25069 11.4709 4.33727C11.5469 4.42386 11.6035 4.5257 11.6369 4.63597C11.6703 4.74623 11.6797 4.86236 11.6645 4.97656L11.0551 9.85156C11.0304 10.0473 10.9354 10.2273 10.7878 10.3581C10.6402 10.4889 10.45 10.5616 10.2527 10.5625H4.0625'
      stroke='#28E15C'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)

const NoIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 13 13' fill='none'>
    <path
      d='M1.625 2.4375H4.0625V7.71875H1.625C1.51726 7.71875 1.41392 7.67595 1.33774 7.59976C1.26155 7.52358 1.21875 7.42024 1.21875 7.3125V2.84375C1.21875 2.73601 1.26155 2.63267 1.33774 2.55649C1.41392 2.4803 1.51726 2.4375 1.625 2.4375V2.4375Z'
      stroke='#FD7F63'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M4.0625 7.71875L6.09375 11.7812C6.52473 11.7812 6.93805 11.61 7.2428 11.3053C7.54754 11.0006 7.71875 10.5872 7.71875 10.1562V8.9375H10.8621C10.9773 8.93778 11.0912 8.91341 11.1963 8.86602C11.3013 8.81862 11.3949 8.74931 11.4709 8.66273C11.5469 8.57614 11.6035 8.4743 11.6369 8.36403C11.6703 8.25377 11.6797 8.13764 11.6645 8.02344L11.0551 3.14844C11.0304 2.95274 10.9354 2.77269 10.7878 2.64187C10.6402 2.51106 10.45 2.43842 10.2527 2.4375H4.0625'
      stroke='#FD7F63'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)
export const CastVote = ({
  castVote,
  selected,
  title = 'Proposal Voting Calldata',
}: {
  castVote: (vote: '0' | '1') => void
  onTally?: () => void
  selected?: '0' | '1'
  title?: string
}) => {
  const isSelected = (vote: '0' | '1') => vote === selected
  const yesClass = isSelected('1') ? 'option yes selected' : 'option yes'
  const noClass = isSelected('0') ? 'option no selected' : 'option no'

  return (
    <Wrapper className='cast-vote'>
      {title && <Text textStyle='h4'>{title}</Text>}
      <div className='options'>
        <div onClick={() => castVote('1')} className={yesClass}>
          <Text tag='h4'>
            <YesIcon />
            Yes
          </Text>
        </div>
        <div onClick={() => castVote('0')} className={noClass}>
          <Text tag='h4'>
            <NoIcon />
            No
          </Text>
        </div>
      </div>
    </Wrapper>
  )
}

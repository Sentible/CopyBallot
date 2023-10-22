import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: (e?: any) => void
}

export const StyledCard = styled.div`
  background: ${({ theme }) => theme.Colors.mediumGrey};
  border-radius: ${({ theme }) => theme.Spacing.four};
  box-shadow: ${({ theme }) => theme.Shadows.mid};
  margin-bottom: ${({ theme }) => theme.Spacing.three};
  padding: ${({ theme }) => theme.Spacing.six};
  position: relative;
`
StyledCard.displayName = 'StyledCard'

const Card = ({ children, className, onClick }: Props) => {
  const classNames = ['card', className].join(' ')
  return (
    <StyledCard className={classNames} onClick={onClick}>
      {children}
    </StyledCard>
  )
}

export const BlankCard = styled(Card)`
  background: none;
  box-shadow: none;
  border: none;
`
BlankCard.displayName = 'BlankCard'

export default Card

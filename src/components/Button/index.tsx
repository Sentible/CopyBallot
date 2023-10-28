import { Spacing } from '@/styles/theme/spacing'
import React from 'react'
import styled from 'styled-components'

type ButtonStyles = 'primary' | 'secondary' | 'success' | 'critical' | 'info'
type ButtonSize = 'tiny' | 'small' | 'regular' | 'large'

type Props = {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  size?: ButtonSize
  tag?: 'button' | 'a'
  type?: ButtonStyles
  variant?: 'solid' | 'outline' | 'link'
  href?: string
  target?: '_self' | '_blank'
  width?: string
}

const SIZE_MAP: any = {
  tiny: Spacing.one,
  small: Spacing.two,
  regular: Spacing.three,
  large: Spacing.four,
}

const StyledButton = styled.button<Props>`
  &.button {
    border-radius: ${({ theme }) => theme.Spacing.two};
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: ${({ theme }) => theme.Colors.white};
    cursor: pointer;
    outline: none;
    padding: ${({ size }) => [SIZE_MAP[size!]]} 0;
    transition: all 0.3s ease-in-out;
    width: ${({ width }) => width};

    &-tiny {
      font-size: calc(${({ theme }) => theme.Typography.size.tiny} + 1px);
    }

    &-small {
      font-size: ${({ theme }) => theme.Typography.size.small};
    }

    &-primary {
      background: linear-gradient(
        ${({ theme }) => `90deg,${theme.Colors.eggplant} 0%,${theme.Colors.purple} 35%,${theme.Colors.darkPurple} 100%`}
      );
      border: 2px solid ${({ theme }) => theme.Colors.darkPurple};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.Colors.darkPurple};
      }

      &.outline {
        background: transparent;
      }
      }
    }

    &:hover:not(:disabled) {
      box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
    }

    :disabled {
      background: ${({ theme }) => theme.Colors.grey};
      cursor: initial;
      border-color: ${({ theme }) => theme.Colors.grey};
    }
  }
`
StyledButton.displayName = 'StyledButton'

const Button: React.FC<Props> = ({
  children,
  className,
  disabled,
  onClick,
  size = 'regular',
  type = 'primary',
  variant = 'solid',
  width = '100%',
}) => {
  const classNames = ['button', `button-${size}`, `button-${type}`, `${variant}`, className].join(' ')

  const ariaLabel = classNames

  return (
    <StyledButton
      aria-label={ariaLabel}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      size={size}
      width={width}
    >
      {children}
    </StyledButton>
  )
}

export default Button

import styled from 'styled-components'

export const StyledApp = styled.div`
  .Toastify__toast-container {
    z-index: 999999;
    ${({ theme }) => theme.Breakpoints.queries.sm} {
      display: flex;
      top: 2vh;
      flex-direction: column-reverse;
      .Toastify__toast {
        margin-bottom: ${({ theme }) => theme.Spacing.four};
      }
    }
  }
`
StyledApp.displayName = 'StyledApp'

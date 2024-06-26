import { UsersThree } from "phosphor-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styled, { css } from "styled-components/native"

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.COLORS.GRAY_600};
    padding: 0 24px 24px;
  `}
`

export const Content = styled.View`
  ${({ theme }) => css`
    flex: 1;
    justify-content: center;
  `}
`

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 56,
  color: theme.COLORS.GREEN_700,
}))`
  align-self: center;
`

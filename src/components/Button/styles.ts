import { TouchableOpacity } from "react-native"
import { css, styled } from "styled-components/native"

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY"

type Props = {
  type: ButtonTypeStyleProps
}

export const Container = styled(TouchableOpacity)<Props>`
  ${({ theme, type }) => css`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    background-color: ${type === "PRIMARY"
      ? theme.COLORS.GREEN_700
      : theme.COLORS.RED_DARK};
    border-radius: 6px;
    align-items: center;
    justify-content: center;
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

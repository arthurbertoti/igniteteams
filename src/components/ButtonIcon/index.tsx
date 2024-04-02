import { TouchableOpacityProps } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { ButtonIconTypeStyleProps, Container, Icon } from "./styles"

type ButtonIconProps = TouchableOpacityProps & {
  type?: ButtonIconTypeStyleProps
  iconName: keyof typeof MaterialIcons.glyphMap
}

export function ButtonIcon({
  iconName,
  type = "PRIMARY",
  ...rest
}: ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={iconName} type={type} />
    </Container>
  )
}

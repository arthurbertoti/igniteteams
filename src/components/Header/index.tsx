import { useNavigation } from "@react-navigation/native"
import { BackButton, BackIcon, Container, Logo } from "./styles"

import LogoImg from "@assets/logo.png"

type HeaderProps = {
  showBackIcon?: boolean
}

export function Header({ showBackIcon = false }: HeaderProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <Container>
      {showBackIcon && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={LogoImg} />
    </Container>
  )
}

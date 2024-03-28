import { BackButton, BackIcon, Container, Logo } from "./styles"

import LogoImg from "@assets/logo.png"

type HeaderProps = {
  showBackIcon?: boolean
}

export function Header({ showBackIcon = false }: HeaderProps) {
  return (
    <Container>
      {showBackIcon && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={LogoImg} />
    </Container>
  )
}

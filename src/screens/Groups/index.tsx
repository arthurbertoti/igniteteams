import { Container } from "./styles"
import { Header, Highlight } from "@components/index"

export function Groups() {
  return (
    <Container>
      <Header showBackIcon />
      <Highlight title={"Turma"} subtitle={"Jogue com a sua turma"} />
    </Container>
  )
}

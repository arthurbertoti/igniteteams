import { Container } from "./styles"
import { GroupCard, Header, Highlight } from "@components/index"

export function Groups() {
  return (
    <Container>
      <Header showBackIcon />
      <Highlight title={"Turma"} subtitle={"Jogue com a sua turma"} />
      <GroupCard title={"Galera do Ignite"} />
    </Container>
  )
}

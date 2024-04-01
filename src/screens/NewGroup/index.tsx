import { Text } from "react-native"
import { Container, Content, Icon } from "./styles"
import { Highlight } from "@components/Highlight"
import { Button, Header, Input } from "@components/index"

export function NewGroup() {
  return (
    <Container>
      <Header showBackIcon />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" />
        <Button style={{ marginTop: 20 }} title="Criar" />
      </Content>
    </Container>
  )
}

import { useState } from "react"
import { Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Container, Content, Icon } from "./styles"
import { Highlight } from "@components/Highlight"
import { Button, Header, Input } from "@components/index"

export function NewGroup() {
  const [group, setGroup] = useState("")
  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate("players", { group })
  }
  return (
    <Container>
      <Header showBackIcon />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />
        <Button style={{ marginTop: 20 }} title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  )
}

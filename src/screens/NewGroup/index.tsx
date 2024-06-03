import { useState } from "react"
import { Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Container, Content, Icon } from "./styles"
import { Highlight } from "@components/Highlight"
import { Button, Header, Input } from "@components/index"

export function NewGroup() {
  const [newGroup, setNewGroup] = useState("")
  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate("players", { group: newGroup })
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
          onChangeText={setNewGroup}
          value={newGroup}
        />
        <Button style={{ marginTop: 20 }} title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  )
}

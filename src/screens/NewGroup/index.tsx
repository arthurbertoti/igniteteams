import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import { Container, Content, Icon } from "./styles"
import { Highlight } from "@components/Highlight"
import { Button, Header, Input } from "@components/index"
import { groupCreate } from "@storage/group/groupCreate"
import { AppError } from "@utils/AppError"
import { Alert } from "react-native"

export function NewGroup() {
  const [group, setGroup] = useState("")
  const navigation = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.")
      }
      await groupCreate(group)
      navigation.navigate("players", { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message)
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar o novo grupo.")
      }
    }
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

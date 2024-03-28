import { useState } from "react"
import { FlatList } from "react-native"
import { Container } from "./styles"
import { GroupCard, Header, Highlight } from "@components/index"

export function Groups() {
  const [groups, setGroups] = useState<string[]>(["Galera do Ignite"])
  return (
    <Container>
      <Header showBackIcon />
      <Highlight title={"Turma"} subtitle={"Jogue com a sua turma"} />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </Container>
  )
}

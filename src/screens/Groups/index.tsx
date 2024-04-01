import { Component, ReactNode, useState } from "react"
import { FlatList } from "react-native"
import { Container } from "./styles"
import { Button, GroupCard, Header, Highlight } from "@components/index"
import { ListEmpty } from "@components/ListEmpty"

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  return (
    <Container>
      <Header />
      <Highlight title={"Turma"} subtitle={"Jogue com a sua turma"} />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title={"Criar nova turma"} />
    </Container>
  )
}

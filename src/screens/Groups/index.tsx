import { useState, useCallback } from "react"
import { Alert, FlatList } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Container } from "./styles"
import {
  Button,
  GroupCard,
  Header,
  Highlight,
  Loading,
} from "@components/index"
import { ListEmpty } from "@components/ListEmpty"
import { groupsGetAll } from "@storage/group/groupsGetAll"

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate("new")
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
      Alert.alert("turmas", "Não foi possível carregar as turmas")
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, [])
  )

  return (
    <Container>
      <Header />
      <Highlight title={"Turma"} subtitle={"Jogue com a sua turma"} />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}
      <Button title={"Criar nova turma"} onPress={handleNewGroup} />
    </Container>
  )
}

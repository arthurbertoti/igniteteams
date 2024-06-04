import { useEffect, useRef, useState } from "react"
import { Alert, FlatList, TextInput } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

import { AppError } from "@utils/AppError"

import { PlayerStorageDTO } from "@storage/player/playerStorageDTO"
import { playerAddByGroup } from "@storage/player/playerAddByGroup"
import { playerRemoveByGroup } from "@storage/player/playersRemoveByGroup"
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam"
import { groupRemoveByName } from "@storage/group/groupRemoveByName"

import {
  Button,
  ButtonIcon,
  Filter,
  Header,
  Highlight,
  Input,
  ListEmpty,
  Loading,
} from "@components/index"

import {
  Container,
  Form,
  HeaderList,
  Icon,
  Name,
  NumberOfPlayers,
  PlayerCardContainer,
} from "./styles"

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState("")
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()

  const route = useRoute()

  const { group } = route.params as RouteParams

  const newPlayerNameRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "informe o nome da pessoa para adicionar"
      )
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameRef.current?.blur()
      setNewPlayerName("")

      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message)
      } else {
        console.log(error)
        Alert.alert("Nova pessoa", "Não foi possível adicionar.")
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam: PlayerStorageDTO[] = await playerGetByGroupAndTeam(
        group,
        team
      )
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado."
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      await fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert("Remover pessoas", "Não foi possível remover a pessoa.")
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)

      navigation.navigate("groups")
    } catch (error) {
      console.log(error)
      Alert.alert("Remover grupo", "Não foi possível remover o grupo.")
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", `Deseja remover o grupo "${group}"?`, [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => groupRemove() },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [group, team])

  return (
    <Container>
      <Header showBackIcon />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon onPress={handleAddPlayer} iconName="add" type={"PRIMARY"} />
      </Form>
      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCardContainer>
              <Icon name="person" />
              <Name>{item.name}</Name>
              <ButtonIcon
                iconName="close"
                type="SECONDARY"
                onPress={() => handlePlayerRemove(item.name)}
              />
            </PlayerCardContainer>
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}
      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}

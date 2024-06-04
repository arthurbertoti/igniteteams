import { useState } from "react"
import { Alert, FlatList } from "react-native"
import { useRoute } from "@react-navigation/native"

import {
  Button,
  ButtonIcon,
  Filter,
  Header,
  Highlight,
  Input,
  ListEmpty,
  PlayerCard,
} from "@components/index"
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"
import { PlayerStorageDTO } from "@storage/player/playerStorageDTO"
import { AppError } from "@utils/AppError"
import { playerAddByGroup } from "@storage/player/playerAddByGroup"
import { playerGetByGroup } from "@storage/player/playerGetByGroup"

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("")
  const [team, setTeam] = useState("Time A")
  const [players, setPlayers] = useState([])

  const route = useRoute()

  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "informe o nome da pessoa para adicionar"
      )
    }
    const newPlayer: PlayerStorageDTO = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(newPlayer, group)
      const players = await playerGetByGroup(group)
      console.log(players)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message)
      } else {
        console.log(error)
        Alert.alert("Nova pessoa", "Não foi possível adicionar.")
      }
    }
  }

  return (
    <Container>
      <Header showBackIcon />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
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
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
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
      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  )
}

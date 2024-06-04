import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig"
import { groupsGetAll } from "./groupsGetAll"

export async function groupRemoveByName(groupName: string) {
  try {
    const storedGroups = await groupsGetAll()

    const groups = storedGroups.filter((group) => group !== groupName)

    const stringfiedGroups = JSON.stringify(groups)

    await AsyncStorage.setItem(PLAYER_COLLECTION, stringfiedGroups)
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)
  } catch (error) {
    throw error
  }
}

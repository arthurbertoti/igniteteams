import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION } from "@storage/storageConfig"
import { groupsGetAll } from "./groupsGetAll"
import { AppError } from "@utils/AppError"

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll()
    const groupAlreadyExist = storedGroups.includes(newGroup)
    if (groupAlreadyExist) {
      throw new AppError("Já existe um grupo cadastrado com este nome!")
    }
    const updatedGroups = JSON.stringify([...storedGroups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, updatedGroups)
  } catch (error) {
    throw error
  }
}

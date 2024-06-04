import { playerGetByGroup } from "./playerGetByGroup"
import { PlayerStorageDTO } from "./playerStorageDTO"

export async function playerGetByGroupAndTeam(
  group: string,
  team: string
): Promise<PlayerStorageDTO[] | []> {
  try {
    const storage = await playerGetByGroup(group)

    const players = storage.filter((player) => player.team === team)

    return players
  } catch (error) {
    throw error
  }
}

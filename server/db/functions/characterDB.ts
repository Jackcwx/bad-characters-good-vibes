import db from '../connection'

import { Character, CharacterData } from '@models/character'

export async function getRandomCharacters(count: number): Promise<Character[]> {
  const tips = await db('characters')
    .orderByRaw('RANDOM()')
    .limit(count)
    .select(
      'id',
      'name',
      'bio',
      'evil_points as evilPoints',
      'good_points as goodPoints',
      'img_url as imgUrl',
    )
  return tips
}

export async function addCharacter(data: CharacterData): Promise<Character[]> {
  const resp = await db('characters')
    .select({ manager_id: data.managerId, name: data.name, bio: data.bio })
    .insert(data)
  return resp
}

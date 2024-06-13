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

export async function getCharacterById(id: number): Promise<Character> {
  const result = await db('characters')
    .where({ id })
    .select(
      'id',
      'name',
      'bio',
      'evil_points as evilPoints',
      'good_points as goodPoints',
      'img_url as imgUrl',
    )
    .first()
  return result
}

export async function patchCharacter(updatedCharacter: Character) {
  return await db('characters').where('id', updatedCharacter.id).update({
    name: updatedCharacter.name,
    bio: updatedCharacter.bio,
    evil_points: updatedCharacter.evilPoints,
    good_points: updatedCharacter.goodPoints,
    img_url: updatedCharacter.imgUrl,
  })
}

export async function addCharacter(data: CharacterData): Promise<number> {
  const resp = await db('characters').insert({
    manager_id: data.managerId,
    name: data.name,
    bio: data.bio,
    evil_points: 0,
    good_points: 0,
    img_url: data.imgUrl,
  })
  return resp[0]
}

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
      'manager_id as managerId',
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
  })
  return resp[0]
}

export async function getTopFiveGoodCharacters() {
  const fiveGood = await db('characters')
    .select()
    .orderBy('good_points', 'desc')
    .limit(5)
  return fiveGood
}
export async function getTopFiveEvilCharacters() {
  const fiveEvil = await db('characters')
    .select()
    .orderBy('evil_points', 'desc')
    .limit(5)
  return fiveEvil
}
export async function getAllCharacters() {
  const allCharacters = await db('characters').select()
  return allCharacters
}

export async function getTopFiveneutralCharacters() {
  const allCharacters = await getAllCharacters()
  const charactersWithNeutralPoints = allCharacters.map((character) => {
    const neutralPoints = Math.abs(
      character.good_points - character.evil_points,
    )
    return {
      ...character,
      neutralPoints,
    }
  })
  const fiveNeutral = charactersWithNeutralPoints
    .sort((a, b) => a.neutralPoints - b.neutralPoints)
    .slice(0, 5)
  return fiveNeutral
}

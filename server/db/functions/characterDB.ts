import db from '../connection'

import { Character } from '@models/character'

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

export async function patchCharacter(updatedCharacter: Character) {
  return await db('characters').where('id', updatedCharacter.id).update({
    name: updatedCharacter.name,
    bio: updatedCharacter.bio,
    evil_points: updatedCharacter.evilPoints,
    good_points: updatedCharacter.goodPoints,
    img_url: updatedCharacter.imgUrl,
  })
}

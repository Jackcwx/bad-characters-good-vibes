import request from 'superagent'

import { Character } from '@models/character'

export async function getCharacters(): Promise<Character[]> {
  const response = await request.get('/api/v1/testing-tips')
  return response.body.tips
}

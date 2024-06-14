import request from 'superagent'

import { Character } from '@models/character'

const baseUrl = new URL('/api/v1/characters', document.baseURI)

export async function getCharacters(): Promise<Character[]> {
  const response = await request.get('/api/v1/testing-tips')
  return response.body.tips
}

export async function getCharacterById(id: number): Promise<Character> {
  const res = await request.get(`${baseUrl}/${id}`)
  return res.body
}

export async function getRandomCharacter(count: number): Promise<Character> {
  const url = `${baseUrl}/random?=${count}`
  const res = await request.get(url)
  return res.body
}

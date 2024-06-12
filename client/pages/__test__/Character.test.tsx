import { describe, it, expect } from 'vitest'
import { JSDOM } from 'jsdom'
import server from '../../../server/server.ts'
import request from 'supertest'
import { useCharacterById } from '../hooks/use-character-by-id'
import { within } from '@testing-library/dom'

const render = (response) => {
  const { document } = new JSDOM(response.text).window
  return within(document)
}
export default render

describe('Character front-end tests', () => {
  it('contains the character data', () => {
    const characterId = 1
    const { data: character } = useCharacterById(characterId)
    return request(server)
      .get('/api/v1/characters/id')
      .then((response) => {
        const screen = render(response)
        const name = screen.getByText(character.name)
        const id = screen.getByText(character.id)
        const managerId = screen.getByText(character.managerId)
        const bio = screen.getByText(character.bio)
        const evilPoints = screen.getByText(character.evilPoints)
        const goodPoints = screen.getByText(character.goodPoints)
        const imgUrl = screen.getByText(character.imgUrl)

        expect(name).toBeInTheDocument()
        expect(id).toBeInTheDocument()
        expect(managerId).toBeInTheDocument()
        expect(bio).toBeInTheDocument()
        expect(evilPoints).toBeInTheDocument()
        expect(goodPoints).toBeInTheDocument()
        expect(imgUrl).toBeInTheDocument()
      })
  })
})

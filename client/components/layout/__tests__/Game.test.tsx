//@vitest-environment jsdom
import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest'
import { renderRoute } from '@/test/setup'
import nock from 'nock'
import { Character } from '@models/character'

// import Game from '@/components/Game.tsx'

nock.disableNetConnect()

const characters: Character[] = [
  {
    id: 0,
    managerId: '123',
    name: 'Blob mcBlobby',
    bio: 'Some say he is a fish, others say he is a man.. What even is a man...',
    evilPoints: 70,
    goodPoints: 45,
    imgUrl: '',
  },
  {
    id: 13,
    managerId: '41',
    name: 'Halphas',
    bio: 'Goes to Bingo on Tuesdays',
    evilPoints: 1000000,
    goodPoints: 7,
    imgUrl: '',
  },
]

const updatedChars: Character[] = [
  {
    id: 1,
    managerId: '4',
    name: 'Princess Puns-a-Lot',
    bio: 'A princess whose puns are so powerful they can defeat any foe.',
    evilPoints: 1,
    goodPoints: 85,
    imgUrl: '',
  },
  {
    id: 4,
    managerId: '3',
    name: 'Major Mayhem',
    bio: 'A chaotic force who loves to create messes but has a heart of gold.',
    evilPoints: 40,
    goodPoints: 45,
    imgUrl: '',
  },
]

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('Game renders', () => {
  it('should show Loading...', async () => {
    // ARRANGE
    nock('http://localhost')
      .get(`/api/v1/characters/random/?count=2`)
      .reply(200, characters)
    // ACT
    const { ...screen } = renderRoute('/game')
    // ASSERT
    const loading = await screen.findByText('Loading...')

    expect(loading).toBeInstanceOf(HTMLParagraphElement)

    expect(loading).toMatchInlineSnapshot(`
      <p>
        Loading...
      </p>
    `)
  })

  it('should show an error', async () => {
    // ARRANGE
    nock('http://localhost')
      .get(`/api/v1/characters/random/?count=2`)
      .reply(500)
    // ACT
    const { ...screen } = renderRoute('/game')
    // ASSERT
    const error = await screen.findByText('Error...')

    expect(error).toBeInstanceOf(HTMLParagraphElement)
    expect(error).toMatchInlineSnapshot(`
      <p>
        Error...
      </p>
    `)
  })

  it('should be happy if everything loads', async () => {
    // ARRANGE
    nock('http://localhost')
      .get(`/api/v1/characters/random?count=2`)
      .reply(200, characters)
    // ACT
    const { ...screen } = renderRoute('/game')
    // ASSERT

    const characterBio = await screen.findByText(characters[1].bio)

    expect(characterBio).toBeInstanceOf(HTMLParagraphElement)
  })

  it('Button: should fetch new', async () => {
    // ARRANGE
    const scope = nock('http://localhost')
      .get(`/api/v1/characters/random?count=2`)
      .reply(200, characters)

    const updateScope = nock('http://localhost')
      .patch('/api/v1/characters', { ...characters[0], evilPoints: 80 })
      .reply(201)

    const updatedScope = nock('http://localhost')
      .get(`/api/v1/characters/random?count=2`)
      .reply(200, updatedChars)

    //ACT
    const { user, ...screen } = renderRoute('/game')
    // ASSERT

    const characterBio = await await screen.findByText(characters[1].bio)
    expect(characterBio).toBeInstanceOf(HTMLParagraphElement)
    expect(characterBio).toBeVisible()

    const updateCardButton = await screen.getByRole('button', {
      name: 'Blob mcBlobby Blob mcBlobby Some say he is a fish, others say he is a man.. What even is a man... 45 70',
    })

    await user.click(updateCardButton)

    const newCharBio = await screen.findByText(updatedChars[1].bio)
    expect(newCharBio).toBeInstanceOf(HTMLParagraphElement)
    expect(newCharBio).toBeVisible()

    expect(scope.isDone()).toBe(true)
    expect(updateScope.isDone()).toBe(true)
    expect(updatedScope.isDone()).toBe(true)
  })
})

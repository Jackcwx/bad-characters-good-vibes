//@vitest-environment jsdom
import { describe, it, expect, beforeAll, vi, beforeEach, afterEach } from 'vitest'
import { renderRoute } from '@/test/setup'
import { waitForElementToBeRemoved, within } from '@testing-library/react'
import nock from 'nock'
import { Character } from '@models/character'


import userEvent from '@testing-library/user-event'
import { click } from '@testing-library/user-event/dist/cjs/convenience/click.js'

// import Game from '@/components/Game.tsx'

nock.disableNetConnect()

const characters: Character[] = [
  {
    id: 0,
    managerId: 123,
    name: 'Blob mcBlobby',
    bio: 'Some say he is a fish, others say he is a man.. What even is a man...',
    evilPoints: 70,
    goodPoints: 45,
    imgUrl: ''
  },
  {
    id: 13,
    managerId: 41,
    name: 'Halphas',
    bio: 'Goes to Bingo on Tuesdays',
    evilPoints: 1000000,
    goodPoints: 7, 
    imgUrl: '',
  },
]

const updatedChars: Character[] = [{
  id: 0,
  managerId: 123,
  name: 'Blob mcBlobby',
  bio: 'Some say he is a fish, others say he is a man.. What even is a man...',
  evilPoints: 80,
  goodPoints: 45,
  imgUrl: ''
},
{
  id: 13,
  managerId: 41,
  name: 'Halphas',
  bio: 'Goes to Bingo on Tuesdays',
  evilPoints: 999995,
  goodPoints: 7, 
  imgUrl: '',
}, ]

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, "error").mockImplementation(() => {})
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
    .patch('/api/v1/characters', {...characters[0], evilPoints: 80}).reply(201)

    const updatedScope = nock('http://localhost')
      .get(`/api/v1/characters/random?count=2`)
      .reply(200, updatedChars)


    //ACT
    const { user, ...screen } = renderRoute('/game')
    // ASSERT

    const characterBio = await screen.findByText(characters[1].bio)
    expect(characterBio).toBeInstanceOf(HTMLParagraphElement)

    const updateCardButton = await screen.getByRole('button', {name: "Blob mcBlobby Blob mcBlobby Some say he is a fish, others say he is a man.. What even is a man... 45 70"})
    
    await user.click(updateCardButton)

    expect(scope.isDone()).toBe(true)
    expect(updateScope.isDone()).toBe(true)
    expect(updatedScope.isDone()).toBe(true)



    // Testing that the other character is also on the page

  })
})

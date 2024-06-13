//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '@/test/setup'
import { within } from '@testing-library/react'
import nock from 'nock'

import Game from '@/components/Game.tsx'

nock.disableNetConnect()

const characters = [
  {
    name: 'Blob mcBlobby',
    bio: 'Some say he is a fish, others say he is a man.. What even is a man...',
    evilPoints: 70,
    goodPoints: 45,
  },
  {
    name: 'Halphas',
    bio: 'Goes to Bingo on Tuesdays',
    evilPoints: '1000000',
    goodPoints: '7', //he saved a kitten once...
  },
]

describe('Game renders', () => {
  it('should show loading..', async () => {
    // ARRANGE
    nock('https://localhost:5173')
      .get(`/api/v1/characters/random/?count=2`)
      .reply(200, characters)
    // ACT
    const { ...screen } = renderRoute('/game')
    // ASSERT
    const loading = await screen.findByText('Loading...')

    expect(loading).toBeInstanceOf(String)

    expect(loading).toMatchInlineSnapshot(`
      <p>
        Loading...
      </p>
    `)
  })

  it('should show an error', async () => {
    // ARRANGE
    nock('https://localhost:5173')
      .get(`/api/v1/characters/random/?count=2`)
      .reply(500)
    // ACT
    const { ...screen } = renderRoute('/game')
    // ASSERT
    const error = await screen.findByText('Error...')

    expect(error).toBeInstanceOf(String)
    expect(error).toMatchInlineSnapshot()

  })

  it('should be happy if everything loads', async () => {
    // ARRANGE
    // ACT
    // ASSERT
  })
})

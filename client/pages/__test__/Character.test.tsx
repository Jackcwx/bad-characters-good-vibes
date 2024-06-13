//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { within } from '@testing-library/react/pure'
import nock from 'nock'

import { renderRoute } from '../../test/setup.tsx'

nock.disableNetConnect()
const id = 1
const mockCharacter = {
  id: 1,
  managerId: 29284,
  name: 'johnny0',
  evilPoints: 200,
  goodPoints: 100,
  imgUrl: 'www.thistheimagefile.com',
}

describe('Character rendering tests', () => {
  it('renders a character info', async () => {
    // ARRANGE

    const scope = nock('http://localhost')
      .get(`/api/v1/characters/${id}`)
      .reply(200, mockCharacter)

    // ACT

    const screen = renderRoute(`/character/${id}`)

    // ASSERT
    const name = await screen.findByRole('heading', { level: 3 })
    
    expect(name).toBeInTheDocument()
    expect(name).toHaveTextContent(mockCharacter.name)
    expect(scope.isDone()).toBe(true)
  })

  it('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/characters/${id}`)
      .reply(500)

    const screen = renderRoute(`/character/${id}`)

    const error = await screen.findByText('There was a error')
    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})

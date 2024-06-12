//@vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import { renderRoute } from '@/test/setup'
import nock from 'nock'
import userEvent from '@testing-library/user-event'
import { useAuth0 } from '@auth0/auth0-react'

beforeAll(() => nock.disableNetConnect())

describe('AddCharacter page renders', () => {
  it('displays page content', async () => {
    const screen = renderRoute('/add-character')

    const header = await screen.findByRole('heading', {
      level: 1,
    })

    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(/create/i)
  })
})

describe('clicking add on add triggers the use-add-character use mutation hook', () => {
  it('can click add button ', async () => {
    const scope = nock('http://localhost')
      // .post('/api/v1/characters', {
      //   name: '',
      //   bio: '',
      //   managerId: '',
      //   evilPoints: 0,
      //   goodPoints: 0,
      //   imgUrl: '',
      // })
      .post('/api/v1/characters', {})
      .reply(200)

    const screen = renderRoute('/add-character')
    const name = await screen.findByText(/name/i)
    const bio = await screen.findByText(/bio/i)
    const addButton = await screen.findByText(/add/i)
    // const addButton = await screen.findByTestId('add-btn')
    await userEvent.type(name, 'Cheeky monkey')
    await userEvent.type(bio, 'Is the cheekiest of monkeys')
    await userEvent.click(addButton)
    expect(scope.isDone()).toBe(true)
  })
})

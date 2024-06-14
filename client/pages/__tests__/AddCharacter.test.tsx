//@vitest-environment jsdom
import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest'
import { renderRoute } from '@/test/setup'
import nock from 'nock'
import userEvent from '@testing-library/user-event'
import { useAuth0 } from '@auth0/auth0-react'

// Mock out auth0
vi.mock('@auth0/auth0-react')

const ACCESS_TOKEN = 'mock-access-token'

beforeAll(() => {
  nock.disableNetConnect()
  window.alert = vi.fn()
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.mocked(useAuth0).mockReturnValue({
    isAuthenticated: true,
    user: { sub: 'auth0|123', nickname: 'bear' },
    getAccessTokenSilently: vi.fn().mockReturnValue(ACCESS_TOKEN),
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
})

afterAll(() => {
  vi.restoreAllMocks()
})

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
    const scope = nock(document.baseURI)
      .post('/api/v1/characters', {
        name: 'Cheeky monkey',
        bio: 'Is the cheekiest of monkeys',
        managerId: 'auth0|123', //TODO: mock out manager id
        evilPoints: 0,
        goodPoints: 0,
        imgUrl: '',
      })
      .reply(200)

    const screen = renderRoute('/add-character')
    const name = await screen.findByLabelText(/name/i)
    const bio = await screen.findByLabelText(/bio/i)
    const addButton = await screen.findByText(/add/i)
    await userEvent.type(name, 'Cheeky monkey')
    await userEvent.type(bio, 'Is the cheekiest of monkeys')
    await userEvent.click(addButton)
    expect(scope.isDone()).toBe(true)
  })
})

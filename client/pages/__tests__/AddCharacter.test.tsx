//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '@/test/setup'

describe('AddCharacter page renders', () => {
  it('displays page content', async () => {
    const screen = renderRoute('add-character')

    const header = await screen.findByRole('heading', {
      level:1,
    })

    expect(header).toBeinTheDocument()
    expect(header).toHaveTextContent(/create/i)
  })
})


describe('clicking add on add triggers the use-add-character use mutation hook', () => {
  it('displays page content ', a)
})
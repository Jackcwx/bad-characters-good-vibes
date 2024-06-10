//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '@/test/setup'

describe('Home page renders', () => {
  it('shows the page content', async () => {
    const screen = renderRoute('/')

    const header = await screen.findByRole('heading', {
      level: 1,
    })

    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(/home/i)
  })
})

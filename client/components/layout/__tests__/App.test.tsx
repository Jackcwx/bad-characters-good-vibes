//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '@/test/setup'
import { within } from '@testing-library/react'

describe('App renders', () => {
  it('shows the navbar content', async () => {
    const screen = renderRoute('/')

    const nav = await screen.getByRole('navigation')

    const homeLink = await screen.findByRole('link', {
      name: /Bad Characters, Good Vibes/i,
    })
    const navlinks = within(nav).getByRole('list')
    const randomLink = within(navlinks).getByText('Random')
    const welcome = within(nav).getByText('Welcome')

    expect(homeLink).toBeInTheDocument()
    expect(navlinks.children).toHaveLength(2)
    expect(randomLink).toBeInTheDocument()
    expect(randomLink).toHaveAttribute('href', '/random')
    expect(welcome.nextElementSibling).toHaveTextContent(/log in/i)
  })

  it('shows the footer content', async () => {
    const screen = renderRoute('/')

    const copyright = await screen.getByText(/2024 Copyright/i)
    const aboutLink = await screen.getByRole('link', { name: 'BCGV' })

    expect(copyright).toHaveTextContent('© 2024 Copyright: BCGV')
    expect(aboutLink).toBeInTheDocument()
  })
})

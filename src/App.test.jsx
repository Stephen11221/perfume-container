// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Sillage storefront', () => {
  it('filters products by scent family', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('tab', { name: 'Woody' }))

    expect(screen.getByRole('heading', { name: 'Santal 33' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Baccarat Rouge 540' })).not.toBeInTheDocument()
    expect(screen.getByText('01 FRAGRANCES')).toBeInTheDocument()
  })

  it('searches product names and shows an empty state for no matches', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Search' }))
    await user.type(screen.getByRole('textbox', { name: 'Search fragrances' }), 'Santal')

    expect(screen.getByRole('heading', { name: 'Santal 33' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Another 13' })).not.toBeInTheDocument()

    await user.clear(screen.getByRole('textbox', { name: 'Search fragrances' }))
    await user.type(screen.getByRole('textbox', { name: 'Search fragrances' }), 'not-a-fragrance')
    expect(screen.getByText(/No fragrances match that search/)).toBeInTheDocument()
  })

  it('adds a product to the bag and updates quantity and subtotal', async () => {
    const user = userEvent.setup()
    render(<App />)

    const santalCard = screen.getByRole('heading', { name: 'Santal 33' }).closest('article')
    await user.click(within(santalCard).getByRole('button', { name: /ADD TO BAG/i }))
    expect(screen.getByRole('button', { name: 'Open bag, 1 items' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open bag, 1 items' }))
    expect(screen.getByText('$235', { selector: 'strong' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    expect(screen.getByText('$470', { selector: 'strong' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /The bag/ })).toHaveTextContent('(2)')

    await user.click(screen.getByRole('button', { name: 'Decrease quantity' }))
    expect(screen.getByRole('heading', { name: /The bag/ })).toHaveTextContent('(1)')
  })

  it('removes an item when its quantity is decreased to zero', async () => {
    const user = userEvent.setup()
    render(<App />)

    const santalCard = screen.getByRole('heading', { name: 'Santal 33' }).closest('article')
    await user.click(within(santalCard).getByRole('button', { name: /ADD TO BAG/i }))
    await user.click(screen.getByRole('button', { name: 'Open bag, 1 items' }))
    await user.click(screen.getByRole('button', { name: 'Decrease quantity' }))

    expect(screen.getByText('Your next favorite is waiting.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /The bag/ })).toHaveTextContent('(0)')
  })
})

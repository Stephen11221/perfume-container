import { describe, expect, it } from 'vitest'
import { addProductToCart, filterProducts, getCartSummary, products, updateCartQuantity } from './store.js'

describe('store domain rules', () => {
  it('filters by category and searches scent notes without case sensitivity', () => {
    expect(filterProducts(products, 'Woody').map((product) => product.name)).toEqual(['Santal 33'])
    expect(filterProducts(products, 'All scents', 'AMBERWOOD').map((product) => product.name)).toEqual(['Baccarat Rouge 540'])
  })

  it('increments an existing cart item rather than duplicating it', () => {
    const oneItem = addProductToCart([], products[0])
    const updatedCart = addProductToCart(oneItem, products[0])

    expect(updatedCart).toHaveLength(1)
    expect(updatedCart[0].quantity).toBe(2)
  })

  it('removes items when quantity reaches zero and prevents negative quantities', () => {
    const cart = addProductToCart([], products[0])

    expect(updateCartQuantity(cart, products[0].id, -1)).toEqual([])
    expect(updateCartQuantity(cart, products[0].id, -5)).toEqual([])
  })

  it('summarizes total item count and subtotal', () => {
    const cart = addProductToCart(addProductToCart([], products[0]), products[1])

    expect(getCartSummary(cart)).toEqual({ count: 2, subtotal: 560 })
    expect(getCartSummary([])).toEqual({ count: 0, subtotal: 0 })
  })
})

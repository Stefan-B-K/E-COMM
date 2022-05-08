
import express from "express"

import cartsRepo from '../repositories/carts.js'
import productsRepo from '../repositories/products.js'
import cartHTML from '../views/carts/show.js'

const router = express.Router()

router.post('/cart/add', async (request, reponse) => {
  let cart;
  if (!request.session.cartID) {
    cart = await cartsRepo.create({ items: [] })
    request.session.cartID = cart.id
  } else {
    cart = await cartsRepo.getOne(request.session.cartID)
    if (!cart) {
      cart = await cartsRepo.create({ items: [] })
      request.session.cartID = cart.id
    }
  }

  const productInCart = cart.items.find((item) => item.id === request.body.productID)
  if (!productInCart) {
    cart.items.push({ id: request.body.productID, quantity: 1 })
  } else {
    productInCart.quantity++
  }
  await cartsRepo.update(cart.id, { items: cart.items })

  reponse.redirect('/cart')
})

router.get('/cart', async (request, response) => {
  if (!request.session.cartID) return response.redirect('/')

  const cart = await cartsRepo.getOne(request.session.cartID)
  if (!cart) {
    request.session.cartID = null
    response.redirect('/')
  }
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id)
    item.product = product
  }

  response.send(cartHTML({ items: cart.items }))
})

router.post('/cart/products/:ID/delete', async (request, response) => {
  const cart = await cartsRepo.getOne(request.session.cartID)
  const items = cart.items.filter((item) => item.id !== request.params.ID)
  await cartsRepo.update(request.session.cartID, { items })
  response.redirect('/cart')
})

export default router
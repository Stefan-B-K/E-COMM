
import express from "express"
import productsRepo from "../repositories/products.js"
import productsHTML from '../views/products/index.js'

const router = express.Router()

router.get('/', async (request, response) => {
  const products = await productsRepo.getAll()
  response.send(productsHTML({ products }))
})

export default router
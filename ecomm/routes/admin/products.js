
import express from "express";
import multer from "multer"

import { handleErrors, requireAuth } from "./utils/middlewares.js";
import productsRepo from '../../repositories/products.js'
import newProductHTML from '../../views/admin/products/new.js'
import editProductHTML from '../../views/admin/products/edit.js'
import productsHTML from '../../views/admin/products/index.js'
import validators from './utils/validators.js'

const router = express.Router()
const { checkProductTitle, checkProductPrice, checkProductImage } = validators
const upload = multer({ storage: multer.memoryStorage() })

router.get('/admin/products', requireAuth, async (request, response) => {
  const products = await productsRepo.getAll()
  response.send(productsHTML({ products }))
})

router.get('/admin/products/new', requireAuth, (request, response) => {
  response.send(newProductHTML({}))
})

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),                     // 'multer' + body parsing
  [checkProductTitle, checkProductPrice],     // AFTER parsing by 'multer'
  handleErrors(newProductHTML),
  async (request, response) => {
    const image = request.file.buffer.toString('base64')
    const { title, price } = request.body
    await productsRepo.create({ title, price, image })
    response.redirect('/admin/products')
  })

router.get('/admin/products/:ID/edit', requireAuth, async (request, response) => {
  const product = await productsRepo.getOne(request.params.ID)
  if (!product) return response.send('Product not found')
  response.send(editProductHTML({ product }))
})

router.post('/admin/products/:ID/edit',
  requireAuth,
  upload.single('image'),                             // 'multer' + body parsing
  [checkProductTitle, checkProductPrice],             // AFTER parsing by 'multer'
  handleErrors(editProductHTML, async (request) => {
    const product = await productsRepo.getOne(request.params.ID)
    return { product }
  }),
  async (request, response) => {
    const changes = request.body
    if (request.file) changes.image = request.file.buffer.toString('base64')
    try {
      await productsRepo.update(request.params.ID, changes)
    } catch {
      return response.send('Product Not Found')
    }
    response.redirect('/admin/products')
  })

router.post('/admin/products/:ID/delete', requireAuth, async (request, response) => {
  await productsRepo.deleteOne(request.params.ID)
  response.redirect('/admin/products')
})

export default router 
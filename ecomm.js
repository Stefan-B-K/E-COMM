
import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

import authRouter from './ecomm/routes/admin/auth.js'
import adminProductsRouter from './ecomm/routes/admin/products.js'
import productsRouter from './ecomm/routes/products.js'
import cartsRouter from './ecomm/routes/carts.js'

const app = express()


app.use(express.static('./ecomm/public'))                                 // middleware function
app.use(bodyParser.urlencoded({ extended: true }))                // middleware function
app.use(cookieSession({ keys: ['sjlspofijgdfdl3d5gh74hf84']}))    // middleware function

app.use(authRouter)
app.use(adminProductsRouter)
app.use(productsRouter)
app.use(cartsRouter)


app.listen(3000, () => {
  console.log('Listening on port 3000...')
})



import express from 'express'

import { handleErrors } from './utils/middlewares.js'
import usersRepo from '../../repositories/users.js'
import signupHTML from '../../views/admin/auth/signup.js'
import loginHTML from '../../views/admin/auth/login.js'
import validators from './utils/validators.js'

const router = express.Router()

const { checkEmail, checkPassword, checkPasswordConfirm,
  verifyEmail, verifyPassword } = validators

router.get('/signup', (request, response) => {
  response.send(signupHTML({}))
})

router.post(
  '/signup',
  [checkEmail, checkPassword, checkPasswordConfirm],
  handleErrors(signupHTML),
  async (request, response) => {
    const { email, password } = request.body
    const user = await usersRepo.create({ email, password })
    response.redirect('/login')
  })

router.get('/login', (request, response) => {
  response.send(loginHTML({}))
})

router.post(
  '/login',
  [verifyEmail, verifyPassword],
  handleErrors(loginHTML),
  async (request, response) => {
    const { email } = request.body
    const user = await usersRepo.getOneBy({ email })
    request.session.userID = user.id              // app.use(cookieSession(...))
    response.redirect('/admin/products')
  })

router.get('/signout', (request, response) => {
  request.session = null
  response.send('Logged out successfull')
})

export default router

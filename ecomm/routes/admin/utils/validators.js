import { check } from 'express-validator'
import usersRepo from '../../../repositories/users.js'

export default {
  checkEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid e-mail')
    .custom(async email => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) throw new Error('Email in use!');
    }),
  checkPassword: check('password')
    .trim()
    .isLength({ min: 4, max: 26 })
    .withMessage('Password must be between 4 and 26 characters'),
  checkPasswordConfirm: check('passwordConfirm')
    .trim()
    .isLength({ min: 4, max: 26 })
    .withMessage('Password must be between 4 and 26 characters')
    .custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error('Passwords not matching')
      }
      return true
    }),
  verifyEmail: check('email')
    .trim()
    .normalizeEmail()
    .custom(async email => {
      const user = await usersRepo.getOneBy({ email })
      if (!user) throw new Error('Incorrect user')
      if (!user.isActive) throw new Error('Account not activated')
    }),
  verifyPassword: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email })
      if (!user) throw new Error('Incorrect password')
      const validPassword = await usersRepo.verifyPassword(user.password, password)
      if (!validPassword) throw new Error('Incorrect password')
    }),
  checkProductTitle: check('title')
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage('Title must be between 3 and 40 characters'),
  checkProductPrice: check('price')
    .trim()
    .toFloat()
    .isFloat({ min: 1.0 })
    .withMessage('Price must be decimal number (minimum 1.00)'),
}
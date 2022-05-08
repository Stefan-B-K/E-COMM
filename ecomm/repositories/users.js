import fs from 'fs'
import crypto from 'crypto'
import util from 'util'
import MainRepository from './_main.js'

const scrypt = util.promisify(crypto.scrypt)

class UsersRepository extends MainRepository {

  async create(attributes) {
    attributes.id = crypto.randomBytes(4).toString('hex')
    attributes.isActive = false
    // hash + salt the password
    const salt = crypto.randomBytes(8).toString('hex')
    const buffer = await scrypt(attributes.password, salt, 64)          // promisified crypto.scrypt
    const user = {
      ...attributes,
      password: `${buffer.toString('hex')}.${salt}`
    }
    const users = await this.getAll()
    users.push(user)
    await this.writeAll(users)

    return user                                                // for use in a cookie
  }

  async verifyPassword(savedPassword, inputPassword) {
    const [hashedPass, savedSalt] = savedPassword.split('.')
    const buffer = await scrypt(inputPassword, savedSalt, 64)
    return buffer.toString('hex') === hashedPass
  }

}

export default new UsersRepository('./ecomm/users.json')




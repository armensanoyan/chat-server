import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { AuthorizationError } from '../../utils/errors.js'
import { addUser, getUserByEmail, softDeleteUser } from '../../models/class-methods/users.js'
import { handleAdd, handleGet, handleDelete } from '../../utils/success-handler.js'
import { JWT_SECRET } from '../../config/config.js'

export const register = async (req, res, next) => {
  const userData = req.body
  try {
    const userFromDb = await getUserByEmail(userData.email)

    if (userFromDb) {
      return next(new AuthorizationError('User already exists'))
    } else {
      const { password, ...user } = await addUser({ ...userData, password: bcrypt.hashSync(userData.password, 8) })

      return handleAdd(res, user)
    }
  } catch (error) {
    return next(error)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ email, userId: user.id }, JWT_SECRET, { expiresIn: '1h' })
      return handleGet(res, { token })
    } else {
      return next(new AuthorizationError('Invalid credentials'))
    }
  } catch (error) {
    return next(error)
  }
}

export const logout = (req, res, next) => {
  // Logout logic here
  //  use redis to remove jwt token
  return handleGet(res, 'Logged out')
}

export const deleteUser = async (req, res, next) => {
  try {
    await softDeleteUser(req.userId)

    return handleDelete(res, 'Deleted')
  } catch (error) {
    return next(error)
  }
}

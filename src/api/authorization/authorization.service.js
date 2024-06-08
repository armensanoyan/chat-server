import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { AuthorizationError } from '../../utils/errors.js'
import { addUser, getUsers, getUserByEmail } from '../../models/class-methods/users.js'
import { handleAdd, handleGet } from '../../utils/success-handler.js'
import { JWT_SECRET } from '../../config/config.js'

export const register = async (req, res, next) => {
  const userData = req.body
  const userFromDb = await getUserByEmail(userData.email)

  if (userFromDb) {
    return next(new AuthorizationError('User already exists'))
  } else {
    const user = await addUser({ ...userData, password: bcrypt.hashSync(userData.password, 8) })
    res.status(201).json({ user })

    return handleAdd(res, user)
  }
}

export const getAllUsers = async (req, res, next) => {
  const users = await getUsers()
  res.status(200).json(users)
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email, userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

    return handleGet(res, { token })
  } else {
    return next(new AuthorizationError('Invalid credentials'))
  }
}

export const logout = (req, res, next) => {
  // Logout logic here
  //  use redis to remove jwt token
  return handleGet(res, 'Logged out')
}

export const deleteUser = (req, res, next) => {
  // Delete user logic here
  return handleGet(res, 'Deleted')
}

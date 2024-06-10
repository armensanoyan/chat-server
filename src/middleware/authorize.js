import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../utils/errors.js'
import { JWT_SECRET } from '../config/config.js'

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Access denied' })
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    // TODO check if user is soft deleted or blocked

    return next()
  } catch (error) {
    return next(new UnauthorizedError('Invalid token'))
  }
}

import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../utils/errors'

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Access denied' })
  try {
    const decoded = jwt.verify(token, 'your-secret-key')
    req.userId = decoded.userId
    return next()
  } catch (error) {
    return UnauthorizedError('Invalid token')
  }
}

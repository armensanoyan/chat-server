import Router from 'express'
import { deleteUser, login, register, logout } from './authorization.service.js'
import { validateUserCreate } from '../../middleware/validate-authorization.js'
import { verifyToken } from '../../middleware/authorize.js'

const router = Router()

router.post('/register', validateUserCreate, register)
router.post('/login', login)
router.get('/logout', verifyToken, logout) // TODO save user auth token in db to handle logout
router.delete('/delete', verifyToken, deleteUser)

export default router

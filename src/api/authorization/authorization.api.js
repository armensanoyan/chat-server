import Router from 'express'
import { deleteUser, getAllUsers, login, register } from './authorization.service.js'
import { validateUserCreate } from '../../middleware/validate-authorization.js'

const router = Router()

router.post('/register', validateUserCreate, register)
router.post('/login', login)
router.get('/logout', login)
router.post('/all', getAllUsers)
router.post('/delete', deleteUser)

export default router

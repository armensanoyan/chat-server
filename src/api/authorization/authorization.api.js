import Router from 'express'
import { deleteUser, login, register } from './authorization.service.js'
import { validateUserCreate } from '../../middleware/validate-authorization.js'

const router = Router()

router.post('/register', validateUserCreate, register)
router.post('/login', login)
router.get('/logout', login) // TODO save user auth token in db to handle logout
router.post('/delete', deleteUser)

export default router

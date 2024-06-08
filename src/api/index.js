import Router from 'express'
import Authorization from './authorization/authorization.js'

const router = Router()

router.use('/auth', Authorization)

export default router

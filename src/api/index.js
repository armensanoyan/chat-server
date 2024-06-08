import Router from 'express'
import Authorization from './authorization/authorization.api.js'
import Chat from './chat/chat.api.js'

const router = Router()

router.use('/auth', Authorization)
router.use('/chat', Chat)

export default router

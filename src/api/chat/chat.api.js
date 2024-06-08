import Router from 'express'
import { validateChatCreate, validateMessageAdd, validateMessageDelete, validateUserAdd } from '../../middleware/validate-chat.js'
import { verifyToken } from '../../middleware/authorize.js'
import { addMessageToChat, addUserToChat, createChat, deleteMessage } from './chat.service.js'

const router = Router()

router.post('/create', verifyToken, validateChatCreate, createChat)
router.post('/add-user', verifyToken, validateUserAdd, addUserToChat)
router.post('/add-message', verifyToken, validateMessageAdd, addMessageToChat)
router.delete('/delete-message/:chatId/:messageId', verifyToken, validateMessageDelete, deleteMessage)

export default router

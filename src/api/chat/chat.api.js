import Router from 'express'
import { validateChatCreate, validateMessageAdd, validateMessageDelete, validateUserAdd, validateGeMessages } from '../../middleware/validate-chat.js'
import { verifyToken } from '../../middleware/authorize.js'
import { addMessageToChat, addUserToChat, createChat, deleteMessage, getMessages } from './chat.service.js'

const router = Router()

router.post('/create', verifyToken, validateChatCreate, createChat)
router.post('/add-user', verifyToken, validateUserAdd, addUserToChat)
router.post('/add-message', verifyToken, validateMessageAdd, addMessageToChat)
router.get('/get-messages/:chatId', verifyToken, validateGeMessages, getMessages)
router.delete('/delete-message/:messageId', verifyToken, validateMessageDelete, deleteMessage)

export default router

import { checkIfUserExistsInChat, createMessage, deleteMessageFromChat } from '../../models/class-methods/messages.js'
import { createChatByName } from '../../models/class-methods/chat.js'
import { insertUserToChat } from '../../models/class-methods/user-chat.js'
// import { InternalError } from '../../utils/errors.js'
import { handleAdd, handleDelete } from '../../utils/success-handler.js'

export const createChat = async (req, res, next) => {
  const { name } = req.body
  try {
    const chat = await createChatByName(name)
    return handleAdd(res, chat)
  } catch (error) {
    console.log({ error })
    return next(error)
  }
}

// return last 20 messages from chat
export const addUserToChat = async (req, res, next) => {
  const { chatId } = req.body
  const { userId } = req
  try {
    await insertUserToChat(chatId, userId)

    return handleAdd(res, 'User added to chat')
  } catch (error) {
    return next(error)
  }
}

// return last 20 messages from chat
export const addMessageToChat = async (req, res, next) => {
  const { chatId, message, parentId } = req.body
  const { userId } = req
  try {
    await checkIfUserExistsInChat(chatId, userId)
    const savedMessage = await createMessage({ chatId, userId, message, parentId })

    return handleAdd(res, savedMessage)
  } catch (error) {
    return next(error)
  }
}

// return last 20 messages from chat
export const deleteMessage = async (req, res, next) => {
  const { chatId, messageId } = req.params // get userId from req.userId
  const { userId } = req
  try {
    await checkIfUserExistsInChat(chatId, userId)
    await deleteMessageFromChat(chatId, messageId)

    return handleDelete(res)
  } catch (error) {
    return next(error)
  }
}

import { ChatNotFoundError } from '../../utils/errors.js'
import models from '../index.js'

export const insertUserToChat = async (chatId, userId) => {
  const chat = await models.ChatsModel.findByPk(chatId)
  if (!chat) {
    throw new ChatNotFoundError('Chat not found')
  }

  await models.UserChatModel.create({ userId, chatId })
}

export const getUserChat = (userId, chatId) => {
  return models.UserChatModel.findOne({ where: { userId, chatId } })
}

import { ChatNotFoundError } from '../../utils/errors.js'
import models from '../index.js'

export const checkIfUserExistsInChat = async (chatId, userId) => {
  const sql = `
    SELECT * FROM chats 
    INNER JOIN "userChat" on  "userChat"."chatId" = chats.id
    WHERE "userChat"."chatId" = :chatId AND "userChat"."userId" = :userId
  `

  const chat = await models.sequelize.query(sql, {
    replacements: { chatId, userId },
    type: models.Sequelize.QueryTypes.SELECT
  })
  if (!chat) {
    throw new ChatNotFoundError('Chat not found')
  }
  return chat
}

export const createMessage = ({ chatId, parentId, userId, message }) => {
  return models.MessagesModel.create({ userId, parentId, chatId, message })
}

export const deleteMessageFromChat = (messageId) => {
  return models.MessagesModel.destroy({ where: { id: messageId } })
}

export const getMessagesFromDB = (userId, chatId, limit = 20) => {
  return models.MessagesModel.findAll({
    where: { userId, chatId },
    order: [['createdAt', 'DESC']],
    limit,
    raw: true
  })
}

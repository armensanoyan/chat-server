import models from '../index.js'
const { ChatsModel } = models

export const createChatByName = (name) => {
  return ChatsModel.create({ name })
}

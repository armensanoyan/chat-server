import { Sequelize } from 'sequelize'
import { DATABASE, USERNAME, PASSWORD, POSTGRES_HOST, POSTGRES_PORT } from '../config/config.js'
import Users from './users.js'
import Chats from './chat.js'
import UserChat from './user-chat.js'
import Messages from './messages.js'

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: POSTGRES_PORT
})

const db = {
  sequelize,
  Sequelize,
  UsersModel: Users(sequelize),
  ChatsModel: Chats(sequelize),
  UserChatModel: UserChat(sequelize),
  MessagesModel: Messages(sequelize)
}

db.UsersModel.hasMany(db.UserChatModel, { foreignKey: 'userId' })
db.ChatsModel.hasMany(db.UserChatModel, { foreignKey: 'chatId' })
db.ChatsModel.hasMany(db.MessagesModel, { foreignKey: 'chatId' })

export default db

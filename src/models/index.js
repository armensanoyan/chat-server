import { Sequelize } from 'sequelize'
import { DATABASE, USERNAME, PASSWORD, POSTGRES_HOST, POSTGRES_PORT } from '../config/config.js'
import Users from './users.js'
import Chats from './chat.js'

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: POSTGRES_PORT
})

const db = {
  sequelize,
  Users: Users(sequelize),
  Chats: Chats(sequelize)
}

// Test the connection
async function testConnection () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnection()

export default db

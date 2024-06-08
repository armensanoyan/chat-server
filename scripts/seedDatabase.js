import 'dotenv/config'
import db from '../src/models/index.js'
import bcrypt from 'bcryptjs'

const insertInitialData = async () => {
  await db.UsersModel.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: bcrypt.hashSync('password', 8)
  }) // Add password
}

const seedDatabase = async () => {
  try {
    await db.sequelize.authenticate()
    console.log('Connection has been established successfully.')

    // Sync all models
    await db.UsersModel.sync({ force: true })
    await db.ChatsModel.sync({ force: true })
    await db.sequelize.sync({ force: true })
    console.log('Database & tables created!')

    // Insert initial data
    await insertInitialData()
    console.log('Initial data inserted!')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  } finally {
    await db.sequelize.close()
  }
}

seedDatabase()

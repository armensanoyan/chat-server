import request from 'supertest'
import app from '../src/app' // Import your Express app
import { it } from '@jest/globals'
import { hardDeleteUser } from '../src/models/class-methods/users'

describe('Chat API', () => {
  let token = ''
  let chatId = 0
  let userId = 0
  const messageId = 0
  it('should create a new chat', async () => {
    const userData = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testChats@gmail.com',
        password: 'testpassword'
      })
    userId = userData.body.data.id
    const responseWithToken = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testChats@gmail.com',
        password: 'testpassword'
      })
    token = responseWithToken.body.data.token
    const res = await request(app)
      .post('/api/chat/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'testChat'
      })
    chatId = res.body.data.id
    expect(res.statusCode).toEqual(201)
    expect(res.body.data).toHaveProperty('id')
  })

  it('should add a user to a chat', async () => {
    const res = await request(app)
      .post('/api/chat/add-user')
      .set('Authorization', `Bearer ${token}`)
      .send({ chatId })
    expect(res.statusCode).toEqual(201)
  })

  it('should add a message to a chat', async () => {
    const res = await request(app)
      .post('/api/chat/add-message')
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'test message',
        chatId
      })
    // messageId = res.body.data.id
    expect(res.statusCode).toEqual(201)
    expect(res.body.data).toHaveProperty('id')
  })

  it('should get messages from a chat', async () => {
    const res = await request(app)
      .get(`/api/chat/get-messages/${chatId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
  })

  it('should delete a message from a chat', async () => {
    const res = await request(app)
      .delete(`/api/chat/delete-message/${messageId}`)
      .set('Authorization', `Bearer ${token}`)
    console.log({ userId })
    await hardDeleteUser(userId)
    expect(res.statusCode).toEqual(204)
  })
})

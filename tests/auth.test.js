import request from 'supertest'
import app from '../src/app' // Import your Express app
import { it } from '@jest/globals'
import { hardDeleteUser } from '../src/models/class-methods/users'

describe('Authorization API', () => {
  let token = ''
  let userId = 0
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@gmail.com',
        password: 'testpassword'
      })
    userId = res.body.data.id
    expect(res.statusCode).toEqual(201)
    expect(res.body.data.email).toEqual('testuser@gmail.com')
  })

  it('should log in a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@gmail.com',
        password: 'testpassword'
      })
    token = res.body.data.token
    expect(res.statusCode).toEqual(200)
  })

  // use this test if you have implemented logout functionality
  // it('should log out a user', async () => {
  //   const loginData = await request(app)
  //     .post('/api/auth/login')
  //     .send({
  //       email: 'testuser@gmail.com',
  //       password: 'testpassword'
  //     })
  //   const token = loginData.body.data.token
  //   const res = await request(app)
  //     .get('/api/auth/logout')
  //     .set('Authorization', `Bearer ${token}`)
  //   expect(res.statusCode).toEqual(200)
  // })

  it('should delete a user', async () => {
    const res = await request(app)
      .delete('/api/auth/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'testuser@gmail.com'
      })

    await hardDeleteUser(userId)
    expect(res.statusCode).toEqual(200)
  })
})

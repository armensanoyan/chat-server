import { Server as SocketIoServer } from 'socket.io'
import { createMessage } from '../models/class-methods/messages.js'

// HTTP server setup
const openConnection = (server) => {
  try {
    const io = new SocketIoServer(server)

    io.on('connection', socket => {
      console.log('A user connected')

      socket.on('message', async ({ chatId, parentId, userId, message }) => {
        const newMessage = await createMessage({ chatId, parentId, userId, message })

        io.emit('message', newMessage)
      })

      socket.on('disconnect', () => {
        console.log('User disconnected')
      })
    })
  } catch (error) {
    console.log('Error while setting up socket server', error)
  }
}

export default openConnection

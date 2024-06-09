import { Server as SocketIoServer } from 'socket.io'
import { createMessage, deleteMessageFromChat } from '../models/class-methods/messages.js'

// HTTP server setup
const openConnection = (server) => {
  try {
    const io = new SocketIoServer(server)

    io.on('connection', socket => {
      console.log('A user connected')

      socket.on('message', async (options) => {
        if (options.action === 'add') {
          const { chatId, parentId, userId, message } = options
          const newMessage = await createMessage({ chatId, parentId, userId, message })
          io.emit('message', newMessage)
        } else if (options.action === 'delete') {
          deleteMessageFromChat(options.messageId)
          io.emit('message', options.messageId)
        }
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

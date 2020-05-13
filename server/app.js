const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id) => ({name, text, id})

io.on('connection', socket => {

  socket.on('userJoined', (data, callback) => {
    if (!data.name || !data.room) {
      return callback('Wrong user data!')
    }
    socket.join(data.room)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })

    callback({userId: socket.id})
    socket.emit('newMessage', m('admin', `Welcome ${data.name}`))
    socket.broadcast.to(data.room)
      .emit('newMessage', m('admin', `User ${data.name} has entered`))
  })

  socket.on('createMessage', (data, callback) => {
    if (!data.text) {
      return callback('Message should be not empty')
    }

    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    }
    callback()
  })
})

module.exports = {
  app,
  server
}

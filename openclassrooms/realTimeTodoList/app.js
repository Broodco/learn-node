// Load modules
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io =require('socket.io').listen(server)

// Set template engine
app.set('view engine','ejs')
// Set assets local url
app.use('/assets',express.static('public'))

// Routing
app.get('/',(request,response)=>{
    response.render('index')
})

// Data storage
let items = []

// Socket.io code
io.sockets.on('connection',(socket)=>{
    // Checks if there's data when the user connects and sends it
    if (items.length != 0){
        for (i =0 ; i<items.length; i++){
        socket.emit('addOrder',items[i])
        socket.broadcast.emit('addOrder',items[i])
        }
    }
    // When receiving new item from client
    socket.on('store',(item)=>{
        // Adds the item to storage
        items.push(item)
        // Send back the item to all users
        socket.emit('addOrder',item)
        socket.broadcast.emit('addOrder',item)
    })
    // When receiving a delete request from client
    socket.on('remove',(index)=>{
        // Removes the item from storage
        items.splice(index,1)
        // Sends the instruction to delete it to the clients
        socket.emit('deleteOrder',index)
        socket.broadcast.emit('deleteOrder',index)
    })
})
// Listen to port
server.listen(8080)
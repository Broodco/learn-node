const express=require('express')
let app = express()
var server = require('http').Server(app);

// Templates
app.set('view engine','ejs')

// Load assets
app.use('/assets', express.static('public'))

// Load socket
const io = require('socket.io').listen(server)

// Routing
app.get('/',(request,response)=>{
    response.render('pages/index')
})

// Socket code
io.sockets.on('connection',(socket)=>{
    console.log('Connexion')
    socket.on('newUser',(pseudo)=>{
        console.log(pseudo)
        socket.pseudo = pseudo
    })
    socket.on('log',(message)=>{
        console.log(socket.pseudo + ' a envoyé le message suivant : '+ message)
        socket.emit('chat',{message:message,pseudo:socket.pseudo})
        socket.broadcast.emit('chat',{message:message,pseudo:socket.pseudo})
    })
})

// Listen to port
server.listen(8080)
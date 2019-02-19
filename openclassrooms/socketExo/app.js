const http = require('http')
const fs = require('fs')


// Chargement du html affiché au client

const server = http.createServer((request,response)=>{
    fs.readFile('./index.html','utf-8',(err,content)=>{
        response.writeHead(200,{"Content-Type":"text.html"})
        response.write(content)
        response.end()
    })
})

// Chargement de socket.io

const io = require('socket.io').listen(server)

io.sockets.on('connection',(socket,pseudo)=>{
    // Envoi d'un message au client lors de la connexion
    socket.emit('message','Vous êtes bien connecté !')
    // Stockage du pseudo du client connecté
    socket.on('newUser',(pseudo)=>{
        socket.pseudo = pseudo
        socket.broadcast.emit('message',socket.pseudo+' vient de se connecter.')
    })    // Affichage d'un message dans la console lorsqu'un client clique sur le bouton
    socket.on('message',(message)=>{
        console.log(socket.pseudo+' vient de pinger '+ message)
    })
})

server.listen(8080)
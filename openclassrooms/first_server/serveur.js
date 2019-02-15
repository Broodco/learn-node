// Variables created. Most of them imported from a node module with the require instruction 

var http = require('http'); 
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;
var jeu = new EventEmitter();

// Event emitter example. We create an event named 'gameover' and on this event (jeu.on('gameover')), we call a function with another parametre
jeu.on('gameover',function(parametre){
    console.log(parametre)
});

jeu.emit('gameover','You Lost');


// Here we create a server with the createserver method called from the http object. It actually creates an event listener such as : 

// var server = http.createServer
// server.on('request',function(req,res){ SOME FUNCTION })

// We can get the page asked by the user with the url.parse(req.url).pathname
// We can get parametres contained into the html with the query function
var server = http.createServer(function(req,res){
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page)
    if (page == '/'){
        res.writeHead(200,{"Content-Type" : "text/plain"});
        res.write('Page d\'acceuil. Bienvenue '+params['name']+'.');
    } else if (page == '/page2'){
        res.writeHead(200,{"Content-Type" : "text/plain"});
        res.write('Seconde page')
    } else {
        res.writeHead(404,{"Content-Type" : "text/plain"});
        res.write('ERROR 404 - PAGE NOT FOUND')
    }
    res.end();
});

// Listen defines on which port the server will be active
server.listen(8080);
// An event on the closing of the server, called by server.close();
server.on('close',function(){
    console.log('Server closed.')
})

let http = require('http')
let url = require('url')
let queryString = require('querystring')
let EventEmitter = require('events')

let App = {
    start: function(port){
        let emitter = new EventEmitter()
        let server = http.createServer((request,response) => {
            if (request.url ==='/'){
                console.log('root')
                response.writeHead(200,{"Content-Type":"text/html"})
                emitter.emit('root',response)
            }
            else if (request.url.split('?')[0] === '/namepage'){
                console.log('name')
                let param = queryString.parse(url.parse(request.url).query)['name'] === undefined ? 'anonyme' : queryString.parse(url.parse(request.url).query)['name']
                emitter.emit('namepage',param,response)
            }
            else{
                console.log('404')
                emitter.emit('notFound', response)
            }
        }
        )
        server.listen(port)
        return emitter
    }
}

module.exports = App
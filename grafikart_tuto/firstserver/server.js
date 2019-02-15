let fs = require('fs')

let app = require('./app').start(3000)

app.on('root',(response)=>{
    response.write('Page d\'acceuil')
    response.end()
})
app.on('namepage',(name,response)=>{
    fs.readFile('index.html','utf-8',(err,data)=>{
        if(err){
            response.writeHead(404,{"Content-Type":"text/html"})
            response.write("Broken Link")
        } else{
            response.writeHead(200,{"Content-Type":"text/html"})
            data = data.replace('{{ name }}',name)
            response.write(data)
        }
        response.end()
    })
})
app.on('notFound',(response)=>{
    response.write('Page Not Found')
    response.end()
})






// server.on('request',(request,response)=>{
//         response.writeHead(200,{'Content-Type' : 'text/html'})
//         let name = queryString.parse(url.parse(request.url).query)['name'] === undefined ? 'anonyme' : queryString.parse(url.parse(request.url).query)['name']
//         fs.readFile('index.html','utf-8',(err,data) => {
//             if (err) {
//                 response.writeHead(404)
//                 response.write("Cette page n'existe pas.")
//             } else{
//                 response.writeHead(200,{'Content-Type':'text/html'})
//                 data = data.replace("{{ name }}",name)
//                 response.write(data)
//             }
//             response.end
//         })
// })

// server.listen("8080")
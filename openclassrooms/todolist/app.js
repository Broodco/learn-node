let express = require('express');
let bodyParser = require('body-parser');
let urlencodedParser= bodyParser.urlencoded({extended : false});
let session = require('cookie-session')
let app = express()

// Template Engine
app.set('view engine','ejs')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'secretkey0727',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }}))

// Creates a todolist in the session
app.use((request,response,next)=>{
    if (request.session.todolist === undefined){
        request.session.todolist = []
    }
    next()
})

// Displays the todolist and the form
app.get('/todo',(request,response)=>{
    response.render('todo.ejs',{todolist : request.session.todolist})
})

// Add an element to the todolist
app.post('/todo/add',urlencodedParser,(request,response)=>{
    if (request.body.newtodo != ''){
        request.session.todolist.push(request.body.newtodo)
    }
    response.redirect('/todo')
})

// Deletes an element from the todolist
app.get('/todo/delete/:id',(request,response)=>{
    if (request.params.id != ''){
        request.session.todolist.splice(request.params.id,1)
    }
    response.redirect('/todo')
})

// Redirects to the todolist

app.use((request,response,next)=>{
    response.redirect('/todo')
})

app.listen(8080)

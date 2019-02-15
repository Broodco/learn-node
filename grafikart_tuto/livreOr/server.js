let express= require('express')
let bodyParser = require('body-parser')
let session = require('express-session')

let app = express()

// Moteur de template
app.set('view engine','ejs')


// Middlewares
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'secretkey0727',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))


// Routes
app.get('/',(request,response)=>{
    response.render('pages/index')
})

app.post('/',(request,response)=>{
    if (request.body.message === undefined || request.body.message === ''){
        request.flash('error', "Vous n'avez rien entré dans le champ de texte.")
        response.redirect('/')
    } else{
        
    }
})

// Listen
app.listen(8080)
// First server made with the express server framework

var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.render('index.ejs',)
});
app.get('/:pagename',function(req,res){
    res.render('info.ejs',{pagename: req.params.pagename});
});
app.use(function(req,res,next){
    res.setHeader('Content-Type','text/plain');
    res.status(404).send('Page Not Found');
});
app.listen(8080);
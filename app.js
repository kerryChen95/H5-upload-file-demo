var express = require('express');
var http = require('http');
var path = require('path');

var routeFile = require('./routes/file');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));

// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.bodyParser({
    uploadDir: './tmp'
}));

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/userfile', function(req, res, next){
    // console.log(req);
    // console.log(req.files);
    res.set('Access-Control-Allow-Origin', '*');
    res.send('File uploaded!');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

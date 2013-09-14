/*
 -------------------------------------
 TODOS: ->
 1.  SIMPLIFY REQUESTS TO ALL USE BODY
 2.  BUILD ROUTE MIDDLEWARE TO PROVIDE A REQ.DATA OBJECT
 3.  IMPLEMENT NEW REQ.DATA MODEL IN ALL COMPONENTS

 4.  IMPLEMENT BASE ROUTE CONTROLLER || SHARED DB METHOD HELPERS
 5.  MODEL WIDE VALIDATION

 6.  PROPER APPLICATION ERROR HANDLING

 7.  REDIS CACHE MONGOOSE LAYER (https://github.com/conancat/mongoose-redis-cache)

 8.  CHEF PROVISIONED VAGRANT BOX
 9.  PUBLIC/PRIVATE GITBUCKET/GIT REPO BRAH

 10. CLOUD HOSTING OPTIONS

 -------------------------------------
 */

require("node-codein")

var express = require('express'),
    http = require('http'),
    path = require('path'),
    swig = require('swig'),
    cons = require('consolidate'),
    fs = require('fs')

var app = express();

var expressLogFile = fs.createWriteStream('./logs/express.log', {flags: 'a'});

// all environments
app.set('port', process.env.PORT || 3000);

swig.cache = {};
swig.init({
    root: 'public/views',
    allowErrors: true,
    cache: false,
    filters: {}
});

app.engine('.html', cons.swig);
app.set('views', './public/views');
app.set('view engine', 'html');
app.set('view options', {layout: false});
app.set('view cache', false);

app.use(express.logger({stream: expressLogFile}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//  --- DB ---
var db = require('./server/db');

// ---- ROUTER ---
var router = require('./server/router/AppRouter').setup(app)
app.set('Router', router);

//  --- SERVER ---
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

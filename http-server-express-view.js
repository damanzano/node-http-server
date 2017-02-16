/**
 * http://usejsdoc.org/
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var users = require('./models/users');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('view cache', false);

app.get('/', function(req, res, next){
	res.render('index');
});

app.get('/description', function(req, res, next){
	res.render('description');
});

// rutas para usuarios
app.get('/users', function(req,res,next){
	//res.end('Debo mostrar todos los usuarios');
	//res.json(users.getAll());
	res.render('users', {users:users.getAll()});
	
});

app.post('/users', function(req,res,next){
	users.create(req.body.name, req.body.email);
	res.redirect("/users");
});

app.delete('/users', function(req,res,next){
	users.deleteALL();
	res.redirect(303, "/users");
});

app.get('/users/:userId', function(req,res,next){
	res.render('users', {users:[users.getUser(req.params.userId)]});
});

app.put('/users/:userId', function(req,res,next){
	users.update(req.params.userId, req.body.name, req.body.email);
	res.redirect(303, "/users");
});

app.delete('/users/:userId', function(req,res,next){
	users.deleteUser(req.params.userId);
	res.redirect(303, "/users");
});

// Ofrecer archivos estáticos si es necesario
app.use(express.static(__dirname + '/public'));

var hostname = 'localhost';
var port = 3000;

app.listen(port, hostname, function(){
	console.log('Servidor corriendo en http://'+hostname+':'+port+'/');
});
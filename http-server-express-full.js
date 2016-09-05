/**
 * http://usejsdoc.org/
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Definir los recursos que vamos a poner disponibles
app.all('/users', function(req,res,next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
});

app.get('/users', function(req,res,next){
	res.end('Debo mostrar todos los usuarios');
});

app.post('/users', function(req,res,next){
	res.write('Debo agregar un nuevo usuario');
	res.end('Los datos del nuevo usuario son: nombre='+req.params.nombre+
			' correo'+req.params.correo);
});

app.delete('/users', function(req,res,next){
	res.end('Debo borrar todos los usuarios *');
});

app.get('/users/:userId', function(req,res,next){
	res.end('Debo mostrar el usuario con id: '+req.params.userId);
});

app.put('/users/:userId', function(req,res,next){
	res.write('Debo actualizar el usuario con id: '+req.params.userId +'\n');
	res.end('Los nuevos datos son: nombre='+req.params.nombre+
			' correo'+req.params.correo);
});

app.delete('/users/:userId', function(req,res,next){
	res.end('Debo borrar el usuario con id: '+req.params.userId);
});

// Ofrecer archivos estáticos si es necesario
app.use(express.static(__dirname + '/public'));

var hostname = 'localhost';
var port = 3000;

app.listen(port, hostname, function(){
	console.log('Servidor corriendo en http://'+hostname+':'+port+'/');
});
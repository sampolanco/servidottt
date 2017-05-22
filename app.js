var express=require('express'),
	path= require('path'),//Concatena rutas estaticas 
	logger = require('morgan'),//inspector registro de actividad
	favicon=require('serve-favicon'),
	jade=require('jade'),
	login=require('./routes/login'), //----Rutas de routing
	/*map=require('./routes/map'),
	invitado=require('./routes/invitado'),
	user=require('./routes/modificarusuario'),
	puntos=require('./routes/agregarpuntos'),
	manual=require('./routes/manual'),*/
	about=require('./routes/about'), //---
	publicDir=path.join(__dirname, 'public'),
	viewsDir=path.join(__dirname, 'views'),
	iconoURL=path.join(publicDir,'images', 'icono.ico'),
	app=express(),
	pgp = require("pg-promise")(/*options*/),//--------Conexion con DB
	//db=require('./controllers/conexion.js'),
	bodyParser=require("body-parser"), 
	cookieParser = require('cookie-parser'),
	cookieSession = require('cookie-session');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	//Configurando app
	.set('views',viewsDir) 
	.set('view engine', 'jade')
	.set('port',port)
	.set('ip',ip)
	//ejecutando middlewares
	.use(cookieParser())
	.use(cookieSession({secret: 'abcd1234'}))
	.use(express.static(publicDir))
	.use(favicon(iconoURL))
	.use('/',login)
	/*.use('/map',map)
	.use('/invitado',invitado)
	.use('/manual',manual)
	.use('/user',user)
	.use('/punto',puntos)*/
	//.use('/about',about);

module.exports=app;
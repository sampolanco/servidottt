var express = require('express'),
	router = express.Router(),
	db=require('../controllers/conexion.js'),
	mapaDAO=require('../Models/geometriasDAO.js'),
	userDAO=require('../Models/usuarioDAO.js');
//-----------------------------------------------Index
router.get('/',
	//Se renderiza el mapa
	function(req, res,next) {
		res.render('mapInvitado',{
							puntos:[],
							listaPoligonos:[],
							usuario:'Invitado'
						});
	});
//-------------------------------------------------------------------------------Buscarusuarios
router.post('/findUser/',
	//Se buscan los usuarios que coincidan con el nombre en la base de datos
	userDAO.buscarUsuarios,
	//Se manda la informacion a la vista para que pueda ser vista en la lista
	function(req, res,next){
		console.log(req.body.listaUsuarios);
		res.send(req.body.listaUsuarios);
	}
);
//----------------------------------------------------------------------------UsuarioClick
router.get('/user/:nombre', 
	//buscar le correo del usuario por su nombre
	userDAO.obtenerCorreo,
	//Buscar los puntos pertenecientes al usuario
	mapaDAO.obtenerPuntosUsuario,	
	//Buscar los poligonos ertenecientes al usuario
	mapaDAO.obtenerMultipoligonosUsuario,
	function(req, res,next) {
		res.render('mapInvitado',{
							puntos:req.body.listaPuntos,
							listaPoligonos:req.body.listaPoligonos,
							usuario:req.session.nombre
						});
	}
);

module.exports = router;

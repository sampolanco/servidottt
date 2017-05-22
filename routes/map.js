var express = require('express'),
	router = express.Router(),
	db=require('../controllers/conexion.js'),
	auth = require('../middlewares/auth'),
	mapaDAO=require('../Models/geometriasDAO.js'),
	userDAO=require('../Models/usuarioDAO.js');

router.use(auth,function(req, res, next) {
	next();
});
//-----------------------------------------------Index
router.get('/',
	//Se obtiene la informacion de puntos y poligonos del usuario
	mapaDAO.obtenerPuntos,
	mapaDAO.obtenerMultipoligonos,
	//Se renderiza el mapa
	function(req, res,next) {
		console.log(req.session.nombre);
		res.render('map',{
							puntos:req.body.listaPuntos,
							listaPoligonos:req.body.listaPoligonos,
							usuario:req.session.nombre
						});
	});
//---------------------------------------------------------------------------------logout
router.post('/',function(req, res,next){
	console.log("logout");
	req.session = null;
	res.redirect('http://localhost:3000/logout');
})
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
		res.render('map',{
							puntos:req.body.listaPuntos,
							listaPoligonos:req.body.listaPoligonos,
							usuario:req.session.nombre
						});
	}
);

module.exports = router;

var express = require('express'),
	router = express.Router(),
	db=require('../controllers/conexion.js'),
	auth = require('../middlewares/auth'),
	userDAO=require('../Models/usuarioDAO.js');
	
//validacion de usuario
router.use(auth,function(req, res, next) {
	next();
}); 
//Se obtienen los datos del usuario para poder pintar su informacion
router.get('/', userDAO.obtenerdatosusuarioporcorreo)
//Modificar el usuario
router.post('/',userDAO.modificarUsuario)

module.exports = router;
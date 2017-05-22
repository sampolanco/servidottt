var express = require('express'),
	router = express.Router(),
	db=require('../controllers/conexion.js'),
	auth = require('../middlewares/auth'),
	geometriaDAO=require('../Models/geometriasDAO.js'),
	userDAO=require('../Models/usuarioDAO.js');

//Primero se valida el usuario y despues se Agregan los puntos
router.post('/',userDAO.validarUsuarioSubirPuntos,
				geometriaDAO.subirPunto,
				geometriaDAO.generarMultipoligonos)


module.exports = router;
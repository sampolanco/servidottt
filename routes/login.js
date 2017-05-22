var express = require('express'),
    router = express.Router();
	//db=require('../controllers/conexion.js'),
	//userDAO=require('../Models/usuarioDAO.js');
	/*bodyParser=require("body-parser"),
router
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())*/

/*-----------------------------------------------------------Login*/
//router.post('/',  userDAO.validarUsuario);

//router.post('/loginEscritorio/', userDAO.validarUsuarioConsola);

router.get('/', function(req, res,next) {
	if(req.session.nombre){//Si la sesion existe
      res.redirect('http://localhost:3000/map');
      next();
    }else{
      res.render('login');
    }
});
/*-----------------------------------------------------------Registro*/
//router.post('/registro/',userDAO.registrarUsuario);

router.get('/registro/', function(req, res,next) {
    res.render('registro');
});
/*-----------------------------------------------------------logout*/
router.get('/logout/', 
	function(req, res, next) {
	//Se elimina el dato de sesion
	req.session = null;
	next();
	},
	function(req, res,next) {
	//Se redirecciona al inicio de la pagina
	res.redirect('http://localhost:3000/');
});

module.exports = router;
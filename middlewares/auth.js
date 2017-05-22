'use strict'

function isAuth(req,res,next){
	if(req.session.nombre){//Si la sesion existe
      //res.send('Hola ' + req.session.nombre);
      //res.render('map');
      console.log('pasa a map');
      next();
    }else{
      //var nombre = 'Tito';
      //req.session.nombre = nombre;
      //res.send('Hola usuario desconocido. De ahora en adelante te llamaremos ' + nombre);
      //res.status(404).send('Sorry, we cannot find that!');
      console.log('no tiene permiso');
      res.redirect('http://localhost:3000/');
    }
}

module.exports = isAuth
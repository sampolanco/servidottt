var express = require('express'),
	router = express.Router(),
	db=require('../controllers/conexion.js');


module.exports={
	//Obtener los puntos para un usuario dela base de datos
	obtenerPuntos: function(req, res, next) {//puntos
		listaPuntos=[];
	    db.any("select id,salud,fechacaptura,st_x,st_y,usuarioid from procedimientos.buscarpuntosporusuario('"+req.session.nombre+"')", 
	    [true]).then(function (data) {
	    	if(data.length>0){
				for(x in data){
					listaPuntos.push(data[x])
				}
			}
			req.body.listaPuntos=listaPuntos;
			next();
		})
	},
	//Obtener los multipoligonos de la base de datos para un usuario
	obtenerMultipoligonos: function(req, res, next) {//poligonos
		listaPoligonos=[];
		poligono=[];
	    db.any("select id,salud,nombre, st_x,st_y,comentario from procedimientos.buscarmultipoligonosporusuario2('"+req.session.nombre+"')", 
	    [true]).then(function (data) {
	    	if(data.length>0){
		    	//se guarda el id del primer poligono
		    	var antiguoId=data[0].id;
		    	//para cada uno de los poligonos
				for(x in data){
					//si se cambio el id del poligono se cambia de fila
					if(data[x].id!=antiguoId){
						//se agrega el poligono a la lissta
						listaPoligonos.push(poligono);
						//se vacia el poligono
						poligono=[];
						//se actualiza el id
						antiguoId=data[x].id;
					}
					//Se agrega el punto al poligono
					poligono.push(data[x]);
				}
				//se agrega el ultimo poligono
				listaPoligonos.push(poligono);
			}
			req.body.listaPoligonos=listaPoligonos;
			next();
		})
	},
	//buscar puntos por usuario
	obtenerPuntosUsuario:function(req, res, next) {//puntos
		//Se reinicia lista de puntos
		listaPuntos=[];
		//se ejecuta el procedimiento para buscar puntos
	    db.any("select id,salud,fechacaptura,st_x,st_y,usuarioid from procedimientos.buscarpuntosporusuario('"+req.body.buscarUsuario+"')", 
	    [true]).then(function (data) {
	    	if(data.length>0){
				for(x in data){
					//se agrega el punto a la lista
					listaPuntos.push(data[x])
				}
			}
			req.body.listaPuntos=listaPuntos;
			next();
		})
	},
	obtenerMultipoligonosUsuario:function(req, res, next) {//poligonos
		//se reinician los datos poligono y punto
		listaPoligonos=[];
		poligono=[];
		db.any("select id,salud,nombre, st_x,st_y,comentario from procedimientos.buscarmultipoligonosporusuario2('"+req.body.buscarUsuario+"')", 
		[true]).then(function (data) {
			if(data.length>0){
		    	//se guarda el id del primer poligono
		    	var antiguoId=data[0].id;
		    	//para cada uno de los poligonos
				for(x in data){
					//si se cambio el id del poligono se cambia de fila
					if(data[x].id!=antiguoId){
						//se agrega el poligono a la lissta
						listaPoligonos.push(poligono);
						//se vacia el poligono
						poligono=[];
						//se actualiza el id
						antiguoId=data[x].id;
					}
					//Se agrega el punto al poligono
					poligono.push(data[x]);
				}
				//se agrega el ultimo poligono
				listaPoligonos.push(poligono);
			}
			req.body.listaPoligonos=listaPoligonos;
			next();
		})
	},
	subirPunto:function(req, res, next) {//poligonos
		//se reinician los datos poligono y punto
		console.log(req.body);
		var puntos = JSON.parse(req.body.puntos);
		//Para cada uno delos puntos recibidos
		for(x in puntos.punto){
			console.log('Puntos: '+puntos.punto[x].fecha+ 'agregado');
		    db.any("select agregarpunto from procedimientos.agregarpunto('"+puntos.punto[x].numeroMangosEnfermos+"','"+puntos.punto[x].fecha+
		    	"','"+req.body.id+"','"+puntos.punto[x].longitud+"','"+puntos.punto[x].latitud+"')", 
		    [true]);
		    //.then(function (data) {console.log('Validado:'+data[0].agregarpunto);})
		}
		next();
		//res.send('true');
	},
	generarMultipoligonos:function(req, res, next) {//poligonos
		//Se generan los multipoligonos
		//console.log('Puntos: '+puntos.punto[x].fecha);
	    db.any("select generarmultipoligono from procedimientos.generarmultipoligono("+req.body.id+",'"+req.body.comentario+"')", 
	    [true]);//.then(function (data) {res.send('true');})
		console.log('Multipoligonos generados exitosamente');
		res.send('true');
	}
};
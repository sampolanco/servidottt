var express = require('express'),
	db=require('../controllers/conexion.js');

module.exports={
	//Validar el usuario para el sistema web
	validarUsuario: function (req,res,next) {
		console.log('El usuario '+req.body.email+ 'intenta entrar');
		console.log('Contraseña: '+req.body.password);
		db.any("select validarusuario from procedimientos.validarusuario('"+req.body.email+"','"+req.body.password+"')", 
		    [true]).then(function (data) {
				console.log('Validado:'+data[0].validarusuario);
				if(data[0].validarusuario>0){//Usuario valido
					req.session.nombre=req.body.email;
			      	res.redirect('http://localhost:3000/map');
			    }else{
			      //var nombre = 'Tito';
			      //req.session.nombre = nombre;
			      //res.send('Hola usuario desconocido. De ahora en adelante te llamaremos ' + nombre);
			      res.render('login');
			    }
			})
    },
    validarUsuarioSubirPuntos: function (req,res,next) {
		console.log('El usuario '+req.body.email+ 'intenta entrar');
		console.log('Contraseña: '+req.body.password);
		db.any("select validarusuario from procedimientos.validarusuario('"+req.body.email+"','"+req.body.password+"')", 
		    [true]).then(function (data) {
				console.log('Validado:'+data[0].validarusuario);
				if(data[0].validarusuario>0){//Usuario valido
					req.body.id = data[0].validarusuario;
					next();
			    }else{
			      res.send('false');
			    }
			})
    },
    //Validar el usuario para la aplicacion de consola
    validarUsuarioConsola: function (req,res,next) {
		console.log(req.body);
		console.log('El usuario: '+req.body.email+'intenta entrar');
		console.log('Contraseña: '+req.body.password);
	    db.any("select validarusuario from procedimientos.validarusuario('"+req.body.email+"','"+req.body.password+"')", 
	    [true]).then(function (data) {
			console.log('Validado:'+data[0].validarusuario);
			if(data[0].validarusuario>0){//Usuario valido
				//req.session.nombre=req.body.email;
		      res.send('true');
		    }else{
		      //var nombre = 'Tito';
		      //req.session.nombre = nombre;
		      //res.send('Hola usuario desconocido. De ahora en adelante te llamaremos ' + nombre);
		      res.send('false');
		    }
			//next();
		})
    },
    //Registrar un nuevo usuario en la base de datos
    registrarUsuario:function(req, res,next) {
		console.log('El usuario: '+req.body.usuario+'intenta crear una cuenta');
		console.log('Email: '+req.body.email);
		console.log('Contraseña: '+req.body.password);
		console.log('Contraseña2: '+req.body.passwordConfirmar);
		if(req.body.password===req.body.passwordConfirmar && req.body.password!=undefined && req.body.usuario!=undefined && req.body.email!=undefined){//Se valida que las contraseñas sean correctas
		    db.any("select agregarusuario from procedimientos.agregarusuario('"+req.body.email+"','"+req.body.usuario+"','"+req.body.password+"')", 
		    [true]).then(function (data) {
				console.log('Validado:'+data[0].agregarusuario);
				if(data[0].agregarusuario==true){//Usuario agregado correctamente
					req.session.nombre=req.body.email;
			      res.redirect('http://localhost:3000/map');
			    }else{
			      //var nombre = 'Tito';
			      //req.session.nombre = nombre;
			      //res.send('Hola usuario desconocido. De ahora en adelante te llamaremos ' + nombre);
			      res.render('login');
			    }
			})
		}
	},
	buscarUsuarios:function(req, res,next){
		listaUsuarios=[];
	    db.any("select * from procedimientos.buscarusuarios('"+req.body.nombreUsuario+"');", 
	    [true]).then(function (data) {
	    	//si hay usuarios
	    	if(data.length>0){
				for(x in data){
					listaUsuarios.push(data[x])
				}
			}
			req.body.listaUsuarios=listaUsuarios;
			next();
		})
	},
	obtenerCorreo:function(req, res, next){
		db.any("select id,nombre,email from procedimientos.buscardatosusuarioponombre('"+req.params.nombre+"')", 
	    [true]).then(function (data) {
	    	//si se obtuvieron datos
	    	if(data.length>0){
	    		req.body.buscarUsuario=data[0].email;
	    		console.log("nombre: "+req.body.buscarUsuario)
				next();
			}
			else{
				res.redirect('http://localhost:3000/map');
			}
		})
	},
	obtenerdatosusuarioporcorreo:function(req, res,next) {//Renderizar la pagina
	//req.session.nombre guarda el correo
    	db.any("select id,nombre,email from procedimientos.buscardatosusuarioporcorreo ('"+req.session.nombre+"')", 
	    [true]).then(function (data) {
	    	console.log(data);
			console.log('Usuario:'+data[0].nombre + 'Email:'+data[0].email);
			if(data[0].nombre!=""){//Se tiene un usuario
		      res.render('user',{
						user:data[0].nombre,
						email:data[0].email
					});
		    }else{
		      //var nombre = 'Tito';
		      //req.session.nombre = nombre;
		      //res.send('Hola usuario desconocido. De ahora en adelante te llamaremos ' + nombre);
		      res.redirect('http://localhost:3000/map');
		    }
		});
	},
	modificarUsuario:function(req, res,next){//Modificar usuario req.session.nombre
		if(req.body.nuevoPassword===req.body.confirmarPassword && req.body.nombreNuevo!="" && req.body.nombreNuevo!=undefined 
		&& req.body.nuevoPassword!="" && req.body.nuevoPassword!=undefined ){//Se valida que las contraseñas
		    db.any("select modificarusuario from procedimientos.modificarusuario('"+req.session.nombre+"','"+req.body.antiguoPassword+"','"
		    +req.body.nombreNuevo+"','"+req.body.nuevoPassword+"')", 
			    [true]).then(function (data) {

			    	//test
			    	console.log("Cambio de datos usuario");
					console.log('El usuario: '+req.body.nombreNuevo+' intenta cambiar una cuenta');
					console.log('Antiguo password: '+req.body.antiguoPassword);
					console.log('Nuevo password: '+req.body.nuevoPassword);

					console.log('Modificdo:'+data[0].modificarusuario);
					if(data[0].modificarusuario==true){//Usuario modificado correctamente
						//req.session=null;
				     	res.redirect('http://localhost:3000/map');
				    }
				    else
				    	res.redirect('http://localhost:3000/user');
				})
		}
		else
			res.redirect('http://localhost:3000/user');
	}
};
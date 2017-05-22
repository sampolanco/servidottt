//https://www.mapbox.com/mapbox.js/example/v1.0.0/l-mapbox-marker/
    //https://www.mapbox.com/mapbox.js/example/v1.0.0/multiple-marker-filters/        Filtrado de puntos
    
    //alert(puntos[0].st_x);
		L.mapbox.accessToken = 'pk.eyJ1Ijoic2FtdWVscG8iLCJhIjoiY2lyaTJyZnRtMDF4dWc2bnIxenBybHV4MSJ9.AWjHLVUywb3Drrv3X3XExA';
		if(puntos.length>0)
			var map=L.mapbox.map('map', 'samuelpo.11p0le68').setView([puntos[0].st_y,puntos[0].st_x], 17);
		else
			var map=L.mapbox.map('map', 'samuelpo.11p0le68').setView([19.381113715771875, -99.1351318359375], 6);
	
	//---------------------------------------Agregar puntos
	function cargarPuntos(todos) {
		for(x in puntos){
			console.log(puntos[x].salud);
			if (puntos[x].salud==0 && todos==true){
				L.mapbox.featureLayer({
			    type: 'Feature',
			    geometry: {
			        type: 'Point',
			        coordinates: [puntos[x].st_x,puntos[x].st_y],
			    },
			    properties: {
			        title: 'Usuario X',
			        description: '01/07/2010',
			        'marker-size': 'large',
			        "marker-color": '#90EE90'
			        //'marker-symbol': '' //https://www.mapbox.com/maki-icons/
			    }
				}).addTo(map);
			}
			else if (puntos[x].salud==1){
				L.mapbox.featureLayer({
			    type: 'Feature',
			    geometry: {
			        type: 'Point',
			        coordinates: [puntos[x].st_x,puntos[x].st_y],
			    },
			    properties: {
			        title: 'Usuario X',
			        description: '01/07/2010',
			        'marker-size': 'large',
			        "marker-color": '#EAEA78'
			        //'marker-symbol': '' //https://www.mapbox.com/maki-icons/
			    }
				}).addTo(map);
			}
			else if (puntos[x].salud==2){
				L.mapbox.featureLayer({
			    type: 'Feature',
			    geometry: {
			        type: 'Point',
			        coordinates: [puntos[x].st_x,puntos[x].st_y],
			    },
			    properties: {
			        title: 'Usuario X',
			        description: '01/07/2010',
			        'marker-size': 'large',
			        "marker-color": '#EAAE78'
			        //'marker-symbol': '' //https://www.mapbox.com/maki-icons/
			    }
				}).addTo(map);
			}
			else if (puntos[x].salud>2){
				L.mapbox.featureLayer({
			    type: 'Feature',
			    geometry: {
			        type: 'Point',
			        coordinates: [puntos[x].st_x,puntos[x].st_y],
			    },
			    properties: {
			        title: 'Usuario X',
			        description: '01/07/2010',
			        'marker-size': 'large',
			        "marker-color": '#EA7878'
			        //'marker-symbol': '' //https://www.mapbox.com/maki-icons/
			    }
				}).addTo(map);
			}
		}

	}
	//----------------------------------------Agregar poligonos
	//funcion que genera las coordenadas para generar el poligono a partir de los puntos
	function generarCoordenadas(_poligono) {
		var listaCoordenadas=[];
		var coordenadas=[];
		//para cada punto del poligono
   		for(x in _poligono){
   			//se agrega la coordenada al arreglo
   			coordenadas.push(_poligono[x].st_x,_poligono[x].st_y);
   			listaCoordenadas.push(coordenadas)
   			coordenadas=[];
   		}
   		return(listaCoordenadas);
	}
	var borrarLayer;
	function cargarMultipoligonos(todos) {

		for(y in listaPoligonos){//Se agregan los poligonos al mapa
			if (listaPoligonos[y][1].salud==0 && todos==true){
			 	L.mapbox.featureLayer({
				    type: 'Feature',
				    geometry: {
				        type: 'Polygon',
				        coordinates: [generarCoordenadas(listaPoligonos[y])],
				    },
				    properties: {
				        //title: 'Usuario X',
				        //description: '01/07/2010',
				        //"fill": '#EA7878'
				        "fill": '#90EE90'
				    }
				}).addTo(map);

			}
			else if(listaPoligonos[y][1].salud>0){
				L.mapbox.featureLayer({
				    type: 'Feature',
				    geometry: {
				        type: 'Polygon',
				        coordinates: [generarCoordenadas(listaPoligonos[y])],
				    },
				    properties: {
				        //title: 'Usuario X',
				        //description: '01/07/2010',
				        //"fill": '#EA7878'
				        "fill": '#EAAE78'
				    }
				}).addTo(map);
			}
		}
	}
	//Mostrar la posicion con click
	map.on('click', function (e) {
        console.log(e.latlng);
	});
	//Cambio de valor del chechbox para mostrar puntos y poligonos
	//-------------------------------------------------------------------------------
	function repintarMapa(todos){
		//map.off();
		map.remove();
		//map._clearPanes();
	    //map = new L.Map('map');
		if(puntos.length>0)
			map=L.mapbox.map('map', 'samuelpo.11p0le68').setView([puntos[0].st_y,puntos[0].st_x], 17);
		else
			map=L.mapbox.map('map', 'samuelpo.11p0le68').setView([19.381113715771875, -99.1351318359375], 6);
		cargarPuntos(todos);
		cargarMultipoligonos(todos);
	}
	$(document).ready(function(){
		//map.on('load', function () {
		cargarPuntos(true);
		cargarMultipoligonos(true);
		//}
		//alert("Ready");
		console.log(listaPoligonos);
		$("#miCheckBox").change(function(){
			if ($("#miCheckBox").is(':checked')) {
				repintarMapa(true);
			}
			else{
				repintarMapa(false);
			}
		});
		$("#barraFlecha").click(function(){
				$("#barraExpandida").slideToggle("fast");
				//$("#barraExpandida").fadeToggle("fast");
			//$("#barra_expandida").toggleClass("ocultar");
			//alert("sam");
		});
		//var x = document.getElementById("myCheck").checked;
		//if(x==false){}
		$("#liSalir").click(function(){
		    $.post("http://localhost:3000/map", function(data, status){});
		});
		$( "#btnBuscar" ).click(function() {
			$( "#liUsuarios a" ).remove();
			$.post("http://localhost:3000/invitado/findUser",{nombreUsuario:$("#txtUsuario").val()})
				.done(function(data){
					//alert("Se buscaron los datos del usuario "+$("#txtUsuario").val());
					if(data.length>0){
						for(x in data){
							$("#liUsuarios").append('<a>'+data[x].nombre+'</a>');
							console.log("datos:", data[x].nombre); // print data;
						}
					}
				});
		});
		//Se hizo click en un usuario de la lista
		$("#liUsuarios").click(function(event){
			//Se busca el usuario y se pinta su informacion
			window.location.href = "http://localhost:3000/invitado/user/"+event.target.text;
			//console.log(event.target.text);
		});
		//Borrar lista cada vez que se enfoque el textBox
		var _txtUsuario = document.getElementById("txtUsuario");
		_txtUsuario.addEventListener("focusin", borrarListaUsuarios);
		_txtUsuario.addEventListener("focusout", borrarListaUsuarios);
		function borrarListaUsuarios() {
		    $( "#liUsuarios a" ).remove();
		}
	});
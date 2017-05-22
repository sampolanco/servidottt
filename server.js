'use strict'

var app=require('./app.js'),
  server=app.listen(app.get('port'),app.get('ip'),function(){
    console.log('Servidor en puerto: '+app.get('port')+'con dir:' +app.get('ip'));
  })
//app.listen(port, ip);
//console.log('Server running on http://%s:%s', ip, port);

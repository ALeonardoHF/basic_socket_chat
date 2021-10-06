const socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario.!');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados: ',resp);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos la conexion con el servidor');
});

// Enviar informacion
// socket.emit('crearMensaje', {
//     usuario: 'Leonardo',
//     mensaje: 'Hola mundo'
// }, function(resp) {
//     console.log('Respuesta del servidor: ', resp);
// });

// Escuchar informacion
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});

// Escuchar cuando un usuario entra al chat
socket.on('listaPersonas', function(personas) {
    console.log(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
});

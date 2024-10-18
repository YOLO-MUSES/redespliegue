console.log('hola desde el backend')
 // Ocultar mensajes después de 3 segundos (3000 milisegundos)
 setTimeout(function() {
    const flashMessages = document.getElementById('flash-messages');
    if (flashMessages) {
        flashMessages.style.display = 'none';
    }
}, 3000);
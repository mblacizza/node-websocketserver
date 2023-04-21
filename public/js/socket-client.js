//Referencia del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

//Con socket.on escucho
socket.on('connect', () => {
    //console.log('Cliente conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    //console.log('Cliente desconectado');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('responder-texto', (payload) => {
    console.log( payload);   
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        uid:'1234nnbd',
        fecha : new Date().getTime()
    };

    //con coscket.emit envio 
    socket.emit('enviar-mensaje',payload, (id) => {
        console.log('Desde el Server ', id );
    });
});

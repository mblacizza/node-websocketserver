const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {};

        //Aqui van los Middlewares
        this.middlewares();

        //Rutas de mi App
        this.routes();

        //Config de Sockets
        this.sockets();

    }

    middlewares() {
        //Utilizamo sel CORS para proteger el rest server
        this.app.use(cors());

        //Posteo el dir publico
        this.app.use(express.static('public'));

    }

    routes() { };

    sockets() {

        this.io.on("connection", socketController);

    };

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servido corriendo en puerto ', this.port);
        });
    }

}

module.exports = Server;
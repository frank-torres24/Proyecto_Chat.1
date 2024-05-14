const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const chatMessages = [];
const PORT = process.env.PORT || 3000;

// Configuración de CORS para Socket.IO
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
};

// Habilitar CORS para todas las solicitudes en Express
app.use(cors());

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    // Envía el historial de mensajes al cliente cuando se reconecta
    socket.on('reconnect', () => {
        socket.emit('chatHistory', chatMessages);
    });

    socket.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        chatMessages.push(message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

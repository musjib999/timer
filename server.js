const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', (socket) => {    
    console.log('a user connected to our socket');
});


io.on('disconnection', (socket) => {
    console.log('a user disconnected to our socket');
});

setInterval(() => {
    var currentTime = new Date().toLocaleTimeString();
    io.emit('EVENT:CURRENT:TIME', JSON.stringify({time: currentTime}));
    // console.log('The time is', currentTime);
    
}, 3000);


server.listen(3000, () => {
    console.log('Server listening on port 3000');
});



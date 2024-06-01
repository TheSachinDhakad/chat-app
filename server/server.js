const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});




io.on('connection', (socket) => {
    console.log("What is socket io ", socket)
    console.log("socket io is avtive to be connected")

    socket.on("chat", (payload) => {
        console.log("What is payload ", payload)
        io.emit('chat', payload)
    })


})

// app.listen(8000, () => console.log("Connect success"));
server.listen(8000, () => console.log("Connect success"));
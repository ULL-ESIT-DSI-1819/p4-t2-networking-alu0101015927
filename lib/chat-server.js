'use strict'

const net = require('net');
let user = 0;
let socket = [];
let port = 60300;

function broadcast(message,index){
    if(socket.length !== 0){
        socket.forEach(function(element){
            if(index != socket.indexOf(element)){
                element.write(`Guest${index}> ${message}`);
            }
        })
    }
};


net.createServer(connection => {

    socket.push(connection);
    
    console.log(`Guest${user} joined this chat.`);
    connection.write('Welcome to telnet chat!' + '\n');
    broadcast(`Gest${user} joined this chat` + '\n',user);

    connection.on('data', data => {
        console.log(`Guest${socket.indexOf(connection)}> ` + data.toString());
        broadcast(data,socket.indexOf(connection));
    })

    connection.on('close',() => {
        
        console.log(`Guest${socket.indexOf(connection)} diconnected`);  
        broadcast(`Guest${socket.indexOf(connection)} diconnected\n`,socket.indexOf(connection));
        socket.splice(socket.indexOf(connection),1);
        socket.forEach(function(element){
            element.write(`Now you are guest${socket.indexOf(element)}`+'\n');
        })
    });

    user++; 

}).listen(port,() => console.log(`Server listening at http://localhost: ${port}`));
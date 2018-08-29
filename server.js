// This is the server script.
const serverName = "Server_Europe_1";
const io = require('socket.io');
const time = require('node-get-time');
const socket = io.listen(4000).sockets;
const readline = require('readline');
const emitStatus = require('./modules/emitStatus.js');
const uuid = require('uuid/v1');

// OWN MODULES OR CONFIGS. These files could be found inside the modules folder or this current folder.
const serverjson = require('./serverFiles/server.json');
const serverID = uuid();
const settings = require('./modules/settings');
const admins = require('./admins.json');
const isAdmin = require('./modules/isAdmin');
const mainServerContact = require('./modules/serverList.js');
const register = require('./modules/registerServer');

let online = [];
let onlineAmount = 0;
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    emitStatus(false, serverID, serverjson.ip);
    console.log("Shutting down..");
    exit = () => {
        process.exit();
    }
    setTimeout(exit, 1000);
  }
});
mainServerContact((data) => {
    console.log(data);
});
register((data) => {
    emitStatus(true, serverID, serverjson.ip);
});
// Check if someone connected to the servewr with the correct ports.
socket.on('connection', (socket) => {
    socket.emit("connected", {
        onlineAmount: onlineAmount,
        online: online
    });
    socket.on('newUser', (data) => {
        console.log("New user");
        let newUser = data.user;
        let totalUser = {
            user: data.user,
            id: socket.id,
            uid: data.id
        }
        online.push(totalUser);
        console.log(online);
        onlineAmount += 1;
    });

    // If we get a new MSG from a client that's connected to the server.
    socket.on("newMSG", (data) => {
        let message = data.message;
        let firstChar = data.message.charAt(0);
        if(firstChar === "/"){
            settings(message, onlineAmount, online, data.id, socket, (res) => {
                socket.emit('recieveMSG', {
                    message: res
                });
            });
        }else {
        let id = data.id;
        let user = data.user;
        let finishedMessage = user + ": " + message;
        let admin = false;
        console.log("["+time.now()+"] "+user + ": " + message); // Get the current time so we can console it together in the console.
        // Emit the message to ALL client EXEPT the one who sent it.
        if(isAdmin(id)){
            admin = true;
        }
        socket.broadcast.emit('recieveMSG', {
            finishedMessage:finishedMessage,
            user: user,
            id: id,
            message: message,
            isAdmin: admin
        });
        }
    });

    // Successfully registers disconnects to the online player count and everything! Awesome!
    socket.on('disconnect', () => {
        onlineAmount -= 1;
        console.log(onlineAmount);
        for(let i = 0; i < online.length; i++){
            if(online[i].id === socket.id){
                online.splice(i, 1);
                console.log(online);
            }
        } 
    });
});

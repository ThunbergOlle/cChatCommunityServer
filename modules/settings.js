// The module for handling messages with "/" character in the beginning.

const Commands = ['help', 'online','ban [ID]','getids','getid [USERNAME]','leave']
const server = require('../server.js');

const isAdmin = require('./isAdmin');
module.exports = (message, onlineAmount, online, id, socket, res) => {
    // Get the message
    if(message === "/help"){
        res(Commands);
        return;
    }
    if (message === "/online" && onlineAmount !== undefined){
        let send = "There is " + onlineAmount + " people here.";
        res(send);
        return;
    }
    else if(isAdmin(id)){
        // Kick players from the current session (Using socket ids.)
        if(message.substr(0, 5) === "/ban "){
            let target = message.substr(5);
            for(let i = 0; i < online.length; i++){
                if(online[i].uid === target){
                    res("You have been kicked!");
                    socket.disconnect(true);
                    return;
                }
            }
        }
        // Get the ids of everyone who is online!
        if(message.substr(0, 7) === "/getids"){
            let onlineIDS = [];
            for(let i = 0; i < online.length; i++){
                onlineIDS.push(online[i].uid);
            }
            console.log(onlineIDS);
            res(onlineIDS);
            return;
        }
        // Get the id of a speciefic player that you then can use to ban or kick the member.
        if(message.substr(0,7) === "/getid "){
            let user = message.substr(7);
            console.log(user);
            let idForUser = "";
            for(let i = 0; i < online.length; i++){
                if(online[i].user === user){
                    idForUser = online[i].uid;
                }
            }
            res(idForUser);
            return;
        }
    } else{
        res("You don't have access to that command! :(");
        return;
    }
}
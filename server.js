const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));
app.set("views", "./views");
app.set("view engine", "ejs");

var arrUsers = [];

io.on('connection', function(socket){
    console.log('Co Nguoi vua ket noi : ' + socket.id);
    socket.on('disconnect', function(){
        console.log(socket.id + " Vừa ngắt kết nối ");
    });
    socket.on("Client-send-username", function(data){
        //trường hợp trùng user đã có (fail)
        if(arrUsers.indexOf(data) !== -1){
            //fail
            socket.emit("Server-send-register-fail");
        }else{
            //success
            arrUsers.push(data);
            socket.Username = data;
            socket.emit("Server-send-register-success", data);
            io.sockets.emit("Server-send-list-users", arrUsers);
        }
    });
    //lắng nghe sự kiện logout
    socket.on("Logout-username", function(){
        arrUsers.splice(arrUsers.indexOf(socket.Username), 1);
        socket.broadcast.emit("Server-send-list-users", arrUsers);
    });
    //lắng nghe sự kiện message
    socket.on("User-send-message", function(data){
        io.sockets.emit("Server-send-message", {un: socket.Username, nd: data});
    });
    //lắng nghe sự kiện Typing cho message
    socket.on("Typing-message", function(){
        console.log(socket.Username + "Still Typing");
    });
    //lắng nghe sự kiện Typing out
    socket.on("Typing-message-out", function(){
        console.log(socket.Username + " Stop Typing ");
    });
})

app.get("/", function(req, res){
    res.render("trangchu");
})

http.listen(3000, function(){
    console.log('Server running on port 3000');
})
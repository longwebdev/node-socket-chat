const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));
app.set("views", "./views");
app.set("view engine", "ejs");

var arrUsers = ["aaa"];

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
})

app.get("/", function(req, res){
    res.render("trangchu");
})

http.listen(3000, function(){
    console.log('Server running on port 3000');
})
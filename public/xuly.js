var socket = io('http://localhost:3000');
//khách hàng khi đăng kí fail
socket.on("Server-send-register-fail", function(){
    alert("Sai Username (co nguoi da dang ki roi)");
})
//khách hàng khi đăng kí thành công
socket.on("Server-send-register-success", function(data){
    $('#currentUser').html(data);
    $('#loginForm').hide(2000);
    $('#chatForm').show(1000);
})
//khách hàng muốn ai đã đăng kí thành công
socket.on("Server-send-list-users", function(data){
    $('#boxContent').html("");
    data.forEach(function(item){
        $('#boxContent').append("<div class='user'>"+ item + "</div>")
    })
})

$(document).ready(function(){
    
    $('#loginForm').show();
    $('#chatForm').hide(); 
    //bắt sự kiện khi client register
    $('#btnRegister').click(function () { 
       socket.emit("Client-send-username", $('#txtusername').val())
        
    });
})
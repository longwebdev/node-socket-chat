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
//lắng nghe sự kiện message do server trả về
socket.on("Server-send-message", function(data){
    $('#listMessage').append(
        "<div class='ms'>"+ data.un + " : " + data.nd +"</div>"
    );
})
//lắng nghe ai đó đang gõ chữ
socket.on("some-one-still-send", function(data){
    $('#thongbao').html(data);
})
//lắng nghe ai đó đã ngững gõ chữ
socket.on("ai-do-da-ngung-go-chu", function(){
    $('#thongbao').html("");
})

$(document).ready(function(){
    
    $('#loginForm').show();
    $('#chatForm').hide(); 
    //bắt sự kiện khi client register
    $('#btnRegister').click(function () { 
       socket.emit("Client-send-username", $('#txtusername').val())
        
    });
    //bắt sự kiện cho nét nút logout
    $('#btnLogout').click(function(){
        socket.emit("Logout-username");
        $('#chatForm').hide();
        $('#loginForm').show(); 
    });
    //bắt sự kiện cho nút send message
    $('#btnSendMessage').click(function(){
        socket.emit("User-send-message", $("#txtMessage").val());
    })
    //bắt sự kiện typing cho input
    $('#txtMessage').focusin(function(){
        socket.emit("Typing-message");
    })
    //bắt sự kiệm typing out
    $('#txtMessage').focusout(function(){
        socket.emit("Stop-rep-tinnhan");
    })
    
})
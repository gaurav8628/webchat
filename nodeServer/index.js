// node server which will handle soocket io connections (to install socket.io use command " npm i socket.io")
const io=require("socket.io")(8000)

const users={}

io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        // console.log("new user ",name)
        users[socket.id]=name;
        socket.broadcast.emit('use-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message : message, name : users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

})



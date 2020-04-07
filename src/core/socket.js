import socket from 'socket.io';



export default (http) => {
    const io = socket(http);
    io.on('connection', function(socket) {
        socket.on('DIALOGS:JOIN', (dialogId, component) => {
            // socket.dialogId = `${dialogId}${component}`;
            socket.join(`${dialogId}${component}` );
        });
        socket.on('DIALOGS:LIVE', (dialogId, component) => {
            socket.leave(`${dialogId}${component}`);
        });
        socket.on('DIALOGS:TYPING', (dialogId, component, user) => {
            socket.broadcast.to(`${dialogId}${component}`)
                .emit('DIALOGS:TYPING', {dialogId, component, user});
        });
        socket.on('MESSAGE:SEND', (dialogId, component) => {
            socket.to(`${dialogId}${component}`).emit('MESSAGE:SEND', {dialogId, component});
        });
    });
    return io;
};
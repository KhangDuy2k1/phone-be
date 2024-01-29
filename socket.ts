import socket from 'socket.io';
import { Server } from 'http';
import { CommentModel } from './src/models/comment';

let io: socket.Server;

export const initSocket = (server: Server) => {
    io = new socket.Server(server, {
        cors: {},
    });
    io.on('connection', (socket) => {
        console.log(`${socket.id} connected`);
        socket.on('join-room', (phone_id: number) => {
            try {
                socket.join(`room-${phone_id}`);
                console.log(`User ${socket.id} joined room-${phone_id}`);
            } catch (error: any) {
                console.error(`Error joining room: ${error.message}`);
            }
        });
    });
};

export const sendComment = (
    dataComment: string,
    userInfo: any,
    phone_id: number
) => {
    io.to(`room-${phone_id}`).emit('sendComment', {
        text: dataComment,
        infoUser: userInfo,
    });
};

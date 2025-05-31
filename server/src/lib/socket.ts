import { Server, Socket } from 'socket.io';
import { ORIGIN } from '../constants';
import { IUserDocument } from '../models/user.model';
import { RedisManager } from './redisManager';
import { httpServer } from '../index';
import { messageType } from '../types';

async function socketInit() {
  await RedisManager.init();
  const publisher = RedisManager.getPublisher();
  const subscriber = RedisManager.getSubscriber();

  const io = new Server(httpServer, {
    pingTimeout: 60000,
    pingInterval: 25000,
    cors: {
      origin: ORIGIN,
    },
  });

  await subscriber.subscribe('new_message', (event) => {
    // console.log(event);
    console.log(process.pid);
    const newMessage = JSON.parse(event);
    const chat = newMessage?.chatId; // have to send to join_chat rooms
    chat?.users?.forEach((user: IUserDocument) => {
      io.to(user?._id).emit('message_received', newMessage); // `'in'` users's room as we have created each user's own room
    });
  });

  await subscriber.subscribe('typing', (event) => {
    // console.log(event);
    const chatId = JSON.parse(event);
    io.in(chatId).emit('set_typing', chatId);
  });

  io.on('connection', (socket: Socket) => {
    console.log(`user connected: ${socket.id}`);

    // create singleton room for each user
    socket.on('setup', (userData) => {
      socket.join(userData?._id); // exclusive to particular user only
      //  console.log(userData._id)
      socket.emit('connected');
    });

    // joining a chat
    socket.on('join_chat', (room) => {
      // room id from frontend
      if (room) {
        // for when chatId= ""
        socket.join(room);
        console.log(`user joined room ${room}`);
      }
    });

    // new message
    socket.on('new_message', async (newMessage) => {
      await publisher.publish('new_message', JSON.stringify(newMessage));
    });

    // typing
    socket.on('typing', async (chatId) => {
      await publisher.publish('typing', JSON.stringify(chatId));
    });

    // clean up socket
    socket.on('disconnect', () => {
      console.log(`user disconnected: ${socket.id}`);

      // leave rooms
      socket.rooms.forEach((room) => {
        socket.leave(room);
        console.log(`user left room: ${room}`);
      });
    });

    socket.on('disconnect', ()=>{
      console.log(`${socket.id} DISCONNECTED`);
    })
  });
}

export default socketInit;

import { Server } from "socket.io";
import http from 'http';
import { ORIGIN } from "../constants";
import app from "../app";
import { IUserDocument } from "../models/user.model";

const httpServer = http.createServer(app);

// console.log(process.env.ORIGIN)


const io = new Server(httpServer, {
  pingTimeout: 60000,
  pingInterval: 25000,
  cors: {
    origin: ORIGIN
  }
})


io.on('connection',(socket)=> {
  console.log(`user connected: ${socket.id}`)
  

  // create singleton room for each user 
  socket.on('setup',(userData) => {
     socket.join(userData?._id); // exclusive to particular user only
    //  console.log(userData._id)  
     socket.emit('connected');
  })

  // joining a chat
  socket.on('join_chat',(room) => { // room id from frontend
    if(room){ // for when chatId= ""
     socket.join(room);
     console.log(`user joined room ${room}`)
    }
  })

  // new message
  socket.on("new_message", (newMessage)=>{
    const chat = newMessage?.chatId; // have to send to join_chat rooms
      chat?.users?.forEach( (user: IUserDocument ) => {      
      io.to(user?._id).emit('message_received',newMessage);  // `'in'` users's room as we have created each user's own room
    })
  })

  // typing
  socket.on('typing', (chatId) => {
    socket.in(chatId).emit('set_typing',chatId) 
  })

  
  // clean up socket  
  socket.on('disconnect',()=>{
    console.log(`user disconnected: ${socket.id}`)
     
    // leave rooms
    socket.rooms.forEach( room => {
      socket.leave(room);
      console.log(`user left room: ${room}`);
    })
  })

  // socket.off('setup', () => {
  //   socket.leave(userData._id)
  // })


})


export { io, app, httpServer};

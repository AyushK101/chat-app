import { io } from "socket.io-client";

// singleton socket instance

// . Connect the Socket Explicitly (Optional but Clean)
// Sometimes, using socket.connect() explicitly (especially if using autoConnect: false) improves control.



// console.log(import.meta.env.VITE_SOCKET_BASE_URI)
const socket = io(import.meta.env.VITE_SOCKET_BASE_URI, {
  autoConnect: false,
  transports: ["websocket"],
  withCredentials: true,
});

export const connectSocket = () => {
  // console.log({socketC: socket.connected})
  if (!socket.connected) socket.connect();
};

export default socket;

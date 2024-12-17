# socketio

- socket == client (individual user)
- io == entire circuit 
## - Acknowledgements
- Feature that allow the sender to confirm that the event has been received and processed by the receiver.
-  They serve as a callback mechanism between the client and server for event-based communication.
```javascript
const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for an event with acknowledgment
  socket.on('exampleEvent', (data, callback) => {
    console.log('Received data:', data);
    // Process the data and send acknowledgment
    callback({ status: 'OK', message: 'Received your data!' });
  });
});
```

```javascript
const socket = io('http://localhost:3000');

// Emit an event and wait for acknowledgment
socket.emit('exampleEvent', { exampleKey: 'exampleValue' }, (response) => {
  console.log('Acknowledgment received from server:', response);
});
```

### Buffer Events 
- 


### Room == subset of clients
- individually every user in inside a room, 


### multiplexing (namespace)


----

1. emit => emit event for attached listeners
2. on => attach listener 
3. broadcast => emit event for all listeners accept itself
4. to => room id in which we want to send message; OR to trigger event for particular room.
```javascript
ex: /*user1socket*/socket.to('user2id').emit('event',data)
```
> Individually every user is inside a room, with room id as userid.

5. join =>  to join people in room 
```js
  socket.join('roomName')
```
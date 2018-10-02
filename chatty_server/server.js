const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all users function
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', function incoming(data) {
    console.log(data);
    let outgoingData;
    const parsedData = JSON.parse(data);
    const randomId = uuidv1();
    if (parsedData.type === 'postMessage') {
      const username = parsedData.username ? parsedData.username : 'Anonymous';
      outgoingData = {
        type: 'incomingMessage',
        id: randomId,
        username: username,
        content: parsedData.content
      };
    } else {
      outgoingData = {
        type: 'incomingNotification',
        id: randomId,
        content: parsedData.content
      };
    }

    console.log('Message received:', outgoingData);
    wss.broadcast(JSON.stringify(outgoingData));
    // ws.send(JSON.stringify(outgoingData));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
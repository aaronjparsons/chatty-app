const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

let alternatingBg = false;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Broadcast to all users function
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Function to update connected user count
function updateUserCount() {
  const amount = wss.clients.size;
  wss.broadcast(JSON.stringify({
    type: 'userCountUpdate',
    count: amount
  }));
}

// Function to assign users a color
function assignColor(ws) {
  const colors = ['#1BE7FF', '#6EEB83', '#E4FF1A', '#FF5714'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  ws.send(JSON.stringify({
    type: 'colorAssignment',
    color: randomColor
  }));
}

// Regex to check for .jpeg/jpg/gif/png extension
function checkURL(url) {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
}

// Check if message has an image link in it
function hasImageLink(content) {
  const words = content.split(' ');
  for (let i of words) {
    if (checkURL(i)) {
      return i;
    }
  }
  return null;
}

// Create the outgoing message data depending on the type
function createOutgoingMessage(parsedData) {
  let outgoingData;
  const randomId = uuidv1();

  if (parsedData.type === 'postMessage') {
    const username = parsedData.username ? parsedData.username : 'Anonymous';
    const image = hasImageLink(parsedData.content);
    // Remove the image link from the message
    const parsedContent = parsedData.content.split(' ').filter(word => {
      return word !== image;
    }).join(' ');
    outgoingData = {
      type: 'incomingMessage',
      id: randomId,
      username: username,
      content: parsedContent,
      image: image,
      userColor: parsedData.userColor,
      alternatingBg: alternatingBg,
    };
  } else {
    outgoingData = {
      type: 'incomingNotification',
      id: randomId,
      content: parsedData.content,
      alternatingBg: alternatingBg,
    };
  }
  alternatingBg = !alternatingBg;
  return outgoingData;
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Update user count when new user connects
  updateUserCount();
  // Assign them a color
  assignColor(ws);
  
  ws.on('message', function incoming(data) {
    console.log(data);
    const parsedData = JSON.parse(data);
    const outgoingData = createOutgoingMessage(parsedData);

    console.log('Message received:', outgoingData);
    wss.broadcast(JSON.stringify(outgoingData));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    // Update user count when user disconnects
    updateUserCount();
  });
});
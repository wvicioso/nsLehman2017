const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  console.log('connected: ' + ip);
  ws.on('message', function incoming(data) {
    console.log(data + " from " + ip);
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      console.log(client);
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

ws.on('close', function close(ws, req) {
  const ip = req.connection.remoteAddress;
  console.log('disconnected: ' + ip);
});

console.log('websocket running');

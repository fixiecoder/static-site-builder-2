const http = require('http');
const fs = require('fs');
const url = require('url');
const WebSocket = require('ws');
 

const server = http.createServer((req, res) => {
  if(req.url === '/status') {
    res.end();
  } else if(req.url.includes('devserver-service')) {
    console.log('reload content', req.method)
    reloadContent();
    res.end();
  } else if(req.url !== '/favicon.ico') {
    res.setHeader('Content-Type', 'text/html');
    let path = `${__dirname}/../dist/home/${req.url}`;
    if(req.url === '/styles.css') {
      res.setHeader('Content-Type', 'text/css');
    }
    fs.readFile(`${path}/index.html`, (err, file) => {
      if(err) {
        res.end('HTTP/1.1 400 Bad Request\r\n\r\n');
      }
      res.end(file);
    })
  }
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

let socket = null;

const wss = new WebSocket.Server({ server, port: 8889 });

wss.on('connection', (ws, req) => {
  console.log('CONNECTED');
  socket = ws;
});

function reloadContent() {
  if(socket) {
    socket.send('RELOAD');
  }
}

server.listen(8888);
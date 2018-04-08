let socket = null;

function connect() {
  socket = new WebSocket('ws://localhost:8889');
}

connect();

function reconnect(attempt = 1) {
  if(attempt === 10) {
    window.location.reload(true);
    return;
  }
  setTimeout(() => {
    fetch('/status')
      .then(res => {
        if(res.ok) {
          connect();
        } else {
          reconnect(attempt += 1);
        }
      })
      .catch(e => {
        reconnect(attempt += 1);
      });
  }, 200 * attempt);
}

socket.onmessage = (message) => {
  if(message.data === 'RELOAD') {
    window.location.reload(true);
  }
};

socket.onopen = () => {
  console.log('dev-server: connected');
};

socket.onclose = () => reconnect();

socket.onerror = () => {
  console.log('DEV SERVER RELOAD CONNECTION ERROR');
}

let socket = null;

function connect() {
  socket = new WebSocket('ws://localhost:8889');
}

connect();

function reconnect(attempt = 1) {
  if(attempt === 10) {
    console.log('hererere')
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
        console.warn('no connect');
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
  console.log('connection status:', 'connection successful');
};

socket.onclose = () => reconnect();

socket.onerror = () => {
  console.log('DEV SERVER RELOAD CONNECTION ERROR');
}

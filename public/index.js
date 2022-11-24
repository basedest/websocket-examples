let ws;

disconnectButton.disabled = true;
sendButton.disabled = true;

function renderMessage(message, color) {
    const messageElement = document.createElement('div');
    if (color) messageElement.style.color = color;
    messageElement.textContent = message;
    messages.appendChild(messageElement);
}

connectButton.onclick = () => {
    console.log('Connecting to server...');
    ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
        console.log('Connected to server');
    };
    ws.onmessage = (event) => {
        console.log(event.data);
        renderMessage(event.data);
    };
    ws.onclose = () => {
        console.log('Disconnected from server');
    }

    console.log('Connected to server');
    disconnectButton.disabled = false;
    sendButton.disabled = false;
    messageInput.disabled = false;
    renderMessage('Connected to server', 'gray');
}

sendButton.onclick = () => {
    const message = messageInput.value;
    ws.send(message);
    messageInput.value = '';
}

disconnectButton.onclick = () => {
    ws.close();
    
    disconnectButton.disabled = true;
    sendButton.disabled = true;
    messageInput.disabled = true;
    renderMessage('Disconnected from server', 'gray');
}
let ws;
const GREEN = '#7f7';

disconnectButton.disabled = true;
sendButton.disabled = true;
messageInput.disabled = true;

function renderMessage(message, connectionEvent) {
    const timestamp = new Date().toLocaleTimeString();
    const messageElement = document.createElement('div');
    if (connectionEvent) messageElement.style.color = GREEN;
    messageElement.innerText = connectionEvent ? `[${timestamp}] ${message}` : message;
    if (!connectionEvent) {
        const spanNode = document.createElement('span');
        spanNode.style.color = GREEN;
        spanNode.innerText = `[${timestamp}] Received message => `;
        messageElement.prepend(spanNode);
    } 
    messages.appendChild(messageElement);
}

connectButton.onclick = () => {
    console.log('Connecting to server...');
    ws = new WebSocket('ws://localhost:3001');
    ws.onopen = () => {
        console.log('Connected to server');
    };
    ws.onmessage = (event) => {
        console.log(event.data);
        renderMessage(event.data);
    };
    ws.onclose = () => {
        console.log('Disconnected from server');
    };

    console.log('Connected to server');
    disconnectButton.disabled = false;
    sendButton.disabled = false;
    messageInput.disabled = false;
    connectButton.disabled = true;
    renderMessage('Connected to server', {type: 'connected'});
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
    connectButton.disabled = false;
    renderMessage('Disconnected from server', {type: 'disconnected'});
}
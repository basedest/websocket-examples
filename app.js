import { WebSocketServer } from 'ws';
import express from 'express';

const app = express();
app.use(express.static('public'));

const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    
    ws.send('Hello! Message From Server!!');

    let counter = 1;
    const spammer = setInterval(() => {
        ws.send(`push notification #${counter++}`);
    }, 1500);

    ws.on('close', () => {
        clearInterval(spammer);
        console.log('client disconnected');
    });
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
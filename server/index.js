const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const port = process.env.PORT || 5000;
let clients = [];

app.ws('/', (ws, req) => {
	console.log('connected to WS server');
	clients.push(ws);
	ws.send(JSON.stringify({ type: 'info', message: 'Connection is successful' }));

	ws.on('message', (msg) => {
		const message = JSON.parse(msg);

		clients.forEach(client => {
			if (client !== ws && client.readyState === client.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	});

	ws.on('close', () => {
		clients = clients.filter(client => client !== ws);
		console.log('Connection closed');
	});
});

app.listen(port, () => {
	console.log(`server started on port ${port}`);
})

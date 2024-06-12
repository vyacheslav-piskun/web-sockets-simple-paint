const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);

const port = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
	console.log('connected to WS server');
	ws.send("Connection is successful");
	ws.on('message', (msg) => {
		const message = JSON.parse(msg);
		ws.send(`message from server: ${message.userName} connected`)
	})
});

app.listen(port, () => {
	console.log(`server started on port ${port}`);
})

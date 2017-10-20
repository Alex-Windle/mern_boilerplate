//dependencies
const express = require('express'); 

//server instance
const app = express(); 

//port
const port = 8000; 

//listen for HTTP requests
app.listen(port, () => {
	console.log('Watching on port ', port); 
}); 

//routes
app.get('/', (req, res) => {
	res.send('App running.');
});

app.post('/customers', (req, res) => {
res.send('Run post route.');
}); 

app.get('/customers', (req, res) => {
	res.send('Run get route.');
}); 

app.put('/customers/:id', (req, res) => {
	res.send('Run update route.');
});

app.delete('/customers', (req, res) => {
	res.send('All customers deleted from database');
});


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
	res.send({
		'1': {
			firstname: 'Greg',
			lastname: 'Smith',
			order: []
		}, 
		'2': {
			firstname: 'Abaigh',
			lastname: 'Johnson',
			order: []
		}
	}); 
}); 

app.get('/customers', (req, res) => {
	res.send({
		1: {
			firstname: 'Greg',
			lastname: 'Smith',
			order: []
		}, 
		2: {
			firstname: 'Abaigh',
			lastname: 'Johnson',
			order: []
		}
	}); 
}); 

app.put('/customers/:id', (req, res) => {
	const id = req.params.id; 
	const database = {
		'1': {
			firstname: 'Greg',
			lastname: 'Smith',
			order: ['socks', 'notebook']
		}, 
		'2': {
			firstname: 'Abaigh',
			lastname: 'Johnson',
			order: ['stamps', 'scarf']
		}
	}; 
	const dataById = database[id]; 
	res.send(dataById);
});

app.delete('/customers', (req, res) => {
	res.send('All customers deleted from database');
});


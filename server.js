//dependencies
const express = require('express'); 
const MongoClient = require('mongodb').MongoClient;
const url = require('./database');
const bodyParser = require('body-parser');

//port
const port = 8000; 

//connect server to database
MongoClient.connect(url, (err, db) => {
	//server instance
	const app = express(); 

	//middleware - body parser
	const urlEncodedParser = bodyParser.urlencoded({ extended: false });
	const jsonParser = bodyParser.json(); 

	//listen for HTTP requests
	app.listen(port, () => {
		console.log('Watching on port ', port); 
	}); 
	
	//connect routes to database
	app.post('/customers', urlEncodedParser, (req, res) => {
		db.collection('customers').insert({
			firstname: req.body.firstname, 
			lastname: req.body.lastname, 
			order: req.body.order
		});
		res.send(req.body.firstname + ' ' + req.body.lastname + ' was added to the customer database.');
	}); 

	app.get('/customers', (req, res) => {
		var cursor = db.collection('customers').find({}); //returns a cursor
		//access documents by iterating cursor object
		let customers = ['filler', 'filler', 'filler']; 
		customers.push('push another filler');
		cursor.forEach((item) => {
			customers.push({
				'firstname' : item.firstname,
				'lastname' : item.lastname,
				'order' : item.order,
			});
			// console.log({
			// 	'firstname' : item.firstname,
			// 	'lastname' : item.lastname,
			// 	'order' : item.order,
			// })
		});
		res.send(customers); 
	});
});

// //routes

// app.get('/customers', (req, res) => {
// 	res.send('Run get route.');
// }); 

// app.put('/customers/:id', (req, res) => {
// 	res.send('Run update route.');
// });

// app.delete('/customers', (req, res) => {
// 	res.send('All customers deleted from database');
// });


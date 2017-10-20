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

	//listen for HTTP requests
	app.listen(port, () => {
		console.log('Watching on port ', port); 
	}); 
	
	//connect routes to database
	app.post('/customers', urlEncodedParser, (req, res) => {

		console.log(req.body);
		//add document to database
		// db.collection('customers').insert({
		// 	firstname: req.body.firstname, 
		// 	lastname: req.body.lastname, 
		// 	order: req.body.order
		// });
		res.send('Run post route.');
	}); 
 
});

// //routes
// app.get('/', (req, res) => {
// 	res.send('App running.');
// });

// app.get('/customers', (req, res) => {
// 	res.send('Run get route.');
// }); 

// app.put('/customers/:id', (req, res) => {
// 	res.send('Run update route.');
// });

// app.delete('/customers', (req, res) => {
// 	res.send('All customers deleted from database');
// });


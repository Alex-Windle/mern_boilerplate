//dependencies
const express = require('express'); 
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = require('./database');
const routes = require('./routes/index');

//port
const port = 8000; 

//connect server to database
MongoClient.connect(url, (err, db) => {
	//server instance
	const app = express(); 

	//listen for HTTP requests
	app.listen(port, () => {
		console.log('Watching on port ', port); 
	}); 

	//add routes
	app.use('/', routes);
});
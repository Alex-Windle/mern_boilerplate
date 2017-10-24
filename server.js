//dependencies
const express = require('express'); 
const routes = require('./routes/index');

//port
const port = 8000; 

//server instance
const app = express(); 

//listen for HTTP requests
app.listen(port, () => {
	console.log('Watching on port ', port); 
}); 

//add routes
app.use('/', routes);
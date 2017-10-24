const express = require('express'); 
const MongoClient = require('mongodb').MongoClient;
const app = express(); 
const bodyParser = require('body-parser');
const url = require('../database');

//middleware - body parser
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json(); 

MongoClient.connect(url, (err, db) => {
	app.get('/', (req, res) => {
		res.send('retrieve homepage');
	});

	app.get('/login', (req, res) => {
		res.send('retrieve login');
	});

	app.get('/logout', (req, res) => {
		res.send('retrieve logout');
	});

	app.post('/customers', urlEncodedParser, (req, res) => {
		db.collection('customers').insert({
			firstname: req.body.firstname, 
			lastname: req.body.lastname, 
			order: req.body.order
		});
		res.send(req.body.firstname + ' ' + req.body.lastname + ' was added to the customer database.');
	}); 

	app.get('/customers', (req, res) => {
		db.collection('customers').find({}) //returns cursor
		.toArray(function (err, customers) { //iterate cursor
	         if (err) {
	           reject(err);
	         } else {
	           res.send({customers});
	         }          
	    }); 
	});

	app.put('/customers/:id', urlEncodedParser, (req, res) => {
		const id = req.params.id;
		const document = {'_id' : ObjectId(id)};
		const updatedDocument = {
			firstname: req.body.firstname, 
			lastname: req.body.lastname, 
			order: req.body.order
		}; 
		db.collection('customers').update(document, updatedDocument, (err, updatedDocument) => {
			if (err) throw err; 
			res.status(200).send(`The records for customer ${id} updated.`);
		});
	});

	app.delete('/customers', (req, res) => {
		db.collection('customers').remove((err) => {
			if (err) throw err; 
			res.status(200).send('All customers deleted from database');
		}); 
	});
}); 

module.exports = app; 
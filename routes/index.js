//dependencies
const express = require('express'); 
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const url = require('../database');

//server instance
const app = express(); 

//middleware - body parser
const jsonParser = bodyParser.json(); 

MongoClient.connect(url, (err, db) => {
	app.post('/customers', jsonParser, (req, res) => {
		db.collection('customers').insert(req.body, (err, customer) => { //returns WriteResult object
			if (err) {
				res.status(422).send('422 Unprocessable Entity');
			} else {
				customer = customer.ops[0]; 
				res.status(200).send(customer); 
			}
		});
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

	app.put('/customers/:id', (req, res) => {
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
			if (err) {
				res.status(422).send('422 Unprocessable Entity');
			} else { 
				res.status(200).send('All customers deleted from database')
			}
		}); 
	});
}); 

module.exports = app; 
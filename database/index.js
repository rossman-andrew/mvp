var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
	console.log('Error connecting to the database');
});

db.once('open', function() {
	console.log('Database connection successful!');
	// Code to be executed goes here, in this callback.
	var doTime = mongoose.Schema({
		toDo: String,
		predictedTime: Number,
		actualTime: Number
	});

	var doTimeItem = mongoose.model('doTimeItem', doTime);
	
});
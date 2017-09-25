var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
	console.log('Error connecting to the database');
});

db.once('open', function() {
	console.log('Database connection successful!');
	// Code to be executed goes here, in this callback.

});
var doTime = mongoose.Schema({
	toDo: String,
	predictedTime: Number,
	actualTime: Number
});

var doTimeItem = mongoose.model('doTimeItem', doTime);

var selectAll = function(callback) {
	doTimeItem.find(function(err, items) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, items);
		}
	});
}

module.exports.selectAll = selectAll; 




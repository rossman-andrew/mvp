var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
	console.log('Error connecting to the database');
});

db.once('open', function() {
	console.log('Database connection successful!');
	// Code to be executed goes here.
	var doTime = mongoose.Schema({
		user: String,
		toDo: String,
		predictedTime: Number,
		startTime: String,
		stopTime: String,
		actualTime: Number
	});

	var doTimeItem = mongoose.model('doTimeItem', doTime);

/*
	var item1 = new doTimeItem({toDo: 'Make an app', predictedTime: 1000, actualTime: 1300});
	var item2 = new doTimeItem({toDo: 'Get sleep', predictedTime: 800, actualTime: 400});
	var item3 = new doTimeItem({toDo: 'Eat dinner', predictedTime: 60, actualTime: 60});

	item1.save(function(err, item1) {
		if(err) {
			console.log("Error saving item1");
		} else {
			console.log("Item1 saved", item1);
		}
	});

	item2.save(function(err, item3) {
		if(err) {
			console.log("Error saving item1");
		}
	});

	item3.save(function(err, item3) {
		if(err) {
			console.log("Error saving item1");
		}
	});
*/

	var selectAll = function(callback) {
		doTimeItem.find({}, function(err, items) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, items);
			}
		});
	}

	var addToDoItem = function(toDo, predictedTime) {
		let newItem = new doTimeItem({toDo, predictedTime});
		newItem.save(function(err, newItem) {
			if (err) {
				console.log('Error saving item in database');
			} else {
				console.log('Saved item in database');
			}
		});
	}

	var setStartTime = function(toDo, startTime) {
		// var retVal = doTimeItem.findOneAndUpdate(
		// 	{"toDo": "Second Task"}, 
		// 	{$set: {"startTime": "Right Now"}}
		// );
		// console.log("setStartTime ran with this toDo:", toDo, "this startTime", startTime);
		// console.log("FOAU returned", retVal);
		doTimeItem.update({"toDo": toDo}, {"startTime": startTime}, function(err, numAffected) {
			console.log("Error:", err, "Number of documents affected", numAffected);
		});
	}

	var setStopTime = function(toDo, stopTime, actualTime) {
		// doTimeItem.findOneAndUpdate(
		// 	{"toDo": toDo}, 
		// 	{$set: {"stopTime": stopTime, "actualTime": actualTime}}
		// );
		doTimeItem.update({"toDo": toDo}, {"stopTime": stopTime, "actualTime": actualTime}, function(err, numAffected) {
			console.log("Error:", err, "Number of documents affected", numAffected);
		});
	}

	module.exports.selectAll = selectAll; 
	module.exports.addToDoItem = addToDoItem;
	module.exports.setStartTime = setStartTime;
	module.exports.setStopTime = setStopTime;
});






var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.get('/toDos', function(req, res) {
	db.selectAll(function(err, data) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(data);
		}
	});
});

app.post('/toDos', function(req, res) {
	db.addToDoItem(req.body.toDo, req.body.predictedTime);
	res.sendStatus(201);
})



app.listen(3000, function() {
	console.log('Server listening on port 3000!');
})
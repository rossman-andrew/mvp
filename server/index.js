var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.get('/', function(req, res) {
	res.send('Got your request!');
})











app.listen(3000, function() {
	console.log('Server listening on port 3000!');
})
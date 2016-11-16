var app = require("./config/custom-express")();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qbeacon_db');
var qbeacon_db = mongoose.connection;

app.listen(3000, function() {
	console.log("The server is running...");
});
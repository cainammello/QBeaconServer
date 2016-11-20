var app = require("./config/custom-express")();
var mosca = require("./config/custom-mosca");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qbeacon_db');
var qbeacon_db = mongoose.connection;

app.listen(3000, function() {
	console.log("The server is running...");
});

app.get("/publish/:message", function(request, response) {
    var message = request.params.message;
    mosca.publish("UFC/CAMPUS_QXD", message);
    response.send(message);
});

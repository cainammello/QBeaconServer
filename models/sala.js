var mongoose = require('mongoose');

var salaSchema = mongoose.Schema({
	
	key:{
		type: Number,
		required: true
	},

	name:{
		type: String,
		//validation
		required: true
	}
});

var Sala = module.exports = mongoose.model('Sala', SalaSchema);

//get Sala
module.exports.getSala = function (callback, limit){
	Sala.find(callback).limit(limit);
}

//get a single Bloc
module.exports.getSalaById = function (id, callback){
	Sala.findById(id, callback);
}

//add a Sala
module.exports.addSala = function (sala, callback){
	Sala.create(sala, callback);
}

//update a Sala
module.exports.updateSala = function (id, sala, options, callback){
	//query to get the id, comparing the Sala id with the id from the bd
	var query = {_id : id};
	var update ={
		name		: sala.name
	};
	
	Sala.findOneAndUpdate(query, update, options, callback);
}

//delete a Sala
module.exports.deleteSala = function (id, callback){
	//query to get the id, comparing the Sala id with the id from the bd
	var query = {_id : id};
	Sala.remove(query, callback);
}

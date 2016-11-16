var mongoose = require('mongoose');

var docenteSchema = mongoose.Schema({
	
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

var Docente = module.exports = mongoose.model('Docente', DocenteSchema);

//get Docente
module.exports.getDocente = function (callback, limit){
	Docente.find(callback).limit(limit);
}

//get a single Bloc
module.exports.getDocenteById = function (id, callback){
	Docente.findById(id, callback);
}

//add a Docente
module.exports.addDocente = function (docente, callback){
	Docente.create(docente, callback);
}

//update a Docente
module.exports.updateDocente = function (id, docente, options, callback){
	//query to get the id, comparing the Docente id with the id from the bd
	var query = {_id : id};
	var update ={
		name		: docente.name
	};
	
	Docente.findOneAndUpdate(query, update, options, callback);
}

//delete a Docente
module.exports.deleteDocente = function (id, callback){
	//query to get the id, comparing the Docente id with the id from the bd
	var query = {_id : id};
	Docente.remove(query, callback);
}

var mongoose = require('mongoose');

var disciplinaSchema = mongoose.Schema({
	
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

var Disciplina = module.exports = mongoose.model('Disciplina', DisciplinaSchema);

//get Disciplina
module.exports.getDisciplina = function (callback, limit){
	Disciplina.find(callback).limit(limit);
}

//get a single Bloc
module.exports.getDisciplinaById = function (id, callback){
	Disciplina.findById(id, callback);
}

//add a Disciplina
module.exports.addDisciplina = function (disciplina, callback){
	Disciplina.create(disciplina, callback);
}

//update a Disciplina
module.exports.updateDisciplina = function (id, disciplina, options, callback){
	//query to get the id, comparing the Disciplina id with the id from the bd
	var query = {_id : id};
	var update ={
		name		: disciplina.name
	};
	
	Disciplina.findOneAndUpdate(query, update, options, callback);
}

//delete a Disciplina
module.exports.deleteDisciplina = function (id, callback){
	//query to get the id, comparing the Disciplina id with the id from the bd
	var query = {_id : id};
	Disciplina.remove(query, callback);
}

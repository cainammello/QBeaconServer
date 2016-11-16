var mongoose = require('mongoose');

var instituicaoSchema = mongoose.Schema({
	
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

var Instituicao = module.exports = mongoose.model('Instituicao', InstituicaoSchema);

//get Instituicao
module.exports.getInstituicao = function (callback, limit){
	Instituicao.find(callback).limit(limit);
}

//get a single Bloc
module.exports.getInstituicaoById = function (id, callback){
	Instituicao.findById(id, callback);
}

//add a Instituicao
module.exports.addInstituicao = function (instituicao, callback){
	Instituicao.create(instituicao, callback);
}

//update a Instituicao
module.exports.updateInstituicao = function (id, instituicao, options, callback){
	//query to get the id, comparing the Instituicao id with the id from the bd
	var query = {_id : id};
	var update ={
		name		: instituicao.name
	};
	
	Instituicao.findOneAndUpdate(query, update, options, callback);
}

//delete a Instituicao
module.exports.deleteInstituicao = function (id, callback){
	//query to get the id, comparing the Instituicao id with the id from the bd
	var query = {_id : id};
	Instituicao.remove(query, callback);
}

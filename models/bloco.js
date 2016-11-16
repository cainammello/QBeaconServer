var mongoose = require('mongoose');
var util = require('./util');

var blocoSchema = mongoose.Schema({
	
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

var Bloco = module.exports = mongoose.model('Bloco', blocoSchema);

//get Bloco
module.exports.getBloco = function (callback, limit){
	Bloco.find(callback).limit(limit);
}

//get a single Bloc
module.exports.getBlocoById = function (id, callback){
	Bloco.findById(id, callback);
}

//add a Bloco
module.exports.addBloco = function (bloco, callback){
    util.addWithKey(Bloco, bloco, 255, callback);
}

//update a bloco
module.exports.updateBloco = function (id, bloco, options, callback){
	//query to get the id, comparing the bloco id with the id from the bd
	var query = {_id : id};
	var update ={
		name		: bloco.name
	};
	
	Bloco.findOneAndUpdate(query, update, options, callback);
}

//delete a bloco
module.exports.deleteBloco = function (id, callback){
	//query to get the id, comparing the bloco id with the id from the bd
	var query = {_id : id};
	Bloco.remove(query, callback);
}

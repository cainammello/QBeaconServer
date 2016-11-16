var mongoose = require('mongoose');

var campusSchema = mongoose.Schema({
	
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

var Campus = module.exports = mongoose.model('Campus', CampusSchema);

//get Campus
module.exports.getCampus = function (callback, limit){
	Campus.find(callback).limit(limit);
}

//get a single Bloc
module.exports.getCampusById = function (id, callback){
	Campus.findById(id, callback);
}

//add a Campus
module.exports.addCampus = function (campus, callback){
	Campus.create(campus, callback);
}

//update a Campus
module.exports.updateCampus = function (id, campus, options, callback){
	//query to get the id, comparing the Campus id with the id from the bd
	var query = {_id : id};
	var update ={
		name		: campus.name
	};
	
	Campus.findOneAndUpdate(query, update, options, callback);
}

//delete a Campus
module.exports.deleteCampus = function (id, callback){
	//query to get the id, comparing the Campus id with the id from the bd
	var query = {_id : id};
	Campus.remove(query, callback);
}

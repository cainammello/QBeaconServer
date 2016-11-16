var mongoose = require('mongoose');
var util = require('util');

var __maxKeyValue = 255;

var __schema = mongoose.Schema({
	
	key:{
		type: Number,
		required: true
	},

	name:{
		type: String,
		required: true
	}
});

var __dao = module.exports = mongoose.model('AulaProxima', __schema);

module.exports.getAll = function (callback) {
	__dao.find(callback).limit(null);
}

module.exports.getById = function (id, callback) {
	__dao.findById(id, callback);
}

module.exports.getByKey = function (key, callback) {
	__dao.find({key: key}, callback);
}

module.exports.add = function (object, callback) {
	util.addWithKey(__dao, object, __maxKeyValue, callback);
}

module.exports.update = function (id, object, options, callback)  {
	__dao.findOneAndUpdate({_id : id}, object, options, callback);
}

module.exports.delete = function (id, callback){
	__dao.remove({_id : id}, callback);
}

module.exports.deleteAll = function (callback){
	__dao.remove({}, callback);
}

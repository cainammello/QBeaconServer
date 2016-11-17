var mongoose = require('mongoose');
var util = require('./util');

var __maxKeyValue = 255;

var __schema = mongoose.Schema({
	
    key: {
        type: Number, 
        required: true
    }, 
    
	keysUpdated: {
		type: Array,
		required: true
	},

	timestamp: {
		type: Number,
		required: true
	}
    
});

var __dao = module.exports = mongoose.model('Historic', __schema);

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

module.exports.update = function (key, object, options, callback)  {
	__dao.findOneAndUpdate({key : key}, object, options, callback);
}

module.exports.delete = function (key, callback){
	__dao.remove({key : key}, callback);
}

module.exports.deleteAll = function (callback){
	__dao.remove({}, callback);
}

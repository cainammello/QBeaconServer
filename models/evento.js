var mongoose = require('mongoose');
var util = require('./util');

var __maxKeyValue = 255;

var __schema = mongoose.Schema({
	
    key: {
        type: Number, 
        required: true
    }, 
    
	keyBloco: {
		type: Number,
		required: true
	},

    keyCampus: {
		type: Number,
		required: true
	},

    keyDisciplina: {
		type: Number,
		required: true
	},

    keyDocente: {
		type: Number,
		required: true
	},

    keyInstuicao: {
		type: Number,
		required: true
	},

    keySala: {
		type: Number,
		required: true
	},

    timestamp: {
		type: Number,
		required: true
	}
    
});

var __dao = module.exports = mongoose.model('Evento', __schema);

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

module.exports.generateMessage = function(key, callback) {
    __dao.find({key: key}, function(err, object) {
        if(err) {
            callback(null);
        } else {
            var message = "";
            message += String.fromCharCode(parseInt(object.keyBloco));
            message += String.fromCharCode(parseInt(object.keyCampus));
            message += String.fromCharCode(parseInt(object.keyDisciplina));
            message += String.fromCharCode(parseInt(object.keyDocente));
            message += String.fromCharCode(parseInt(object.keyInstuicao));
            message += String.fromCharCode(parseInt(object.keySala));
            callback(message);
        }        
    });
}

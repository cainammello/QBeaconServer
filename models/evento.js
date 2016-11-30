var mongoose = require('mongoose');
var util = require('./util');

var __maxKeyValue = 255;

var __schema = mongoose.Schema({
	
    key: {
        type: Number, 
        required: true
    }, 
    
    keyBeacon: {
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
    
    keyDisciplinaPrevious: {
		type: Number,
		required: true
	},
    
    keyDisciplinaNext: {
		type: Number,
		required: true
	},

    keyDocente: {
		type: Number,
		required: true
	},

    keyInstituicao: {
		type: Number,
		required: true
	},

    keySala: {
		type: Number,
		required: true
	},
    
    keyHistorico: {
		type: Number,
		required: true
	},

    timestampBegin: {
		type: Number,
		required: true
	},
    
    timestampEnd: {
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

module.exports.generateMessage = function(object) {
    var intToHex = function(number, length) {
        length = length || 2;
        if(number != undefined) {
            var res = "000000000000000" + number.toString(16);
            return res.substring(res.length - length, res.length);
        } else {
            return intToHex(0, 2)
        }
    }
    
    var message = "";
    message += intToHex(object.keySala, 2);
    message += intToHex(object.keyBloco, 2);
    message += intToHex(object.keyDisciplina, 2);
    message += intToHex(new Date(object.timestampBegin).getHours(), 2); // Hora de inicio
    
    message += intToHex(object.keyDocente, 4);
    message += intToHex(object.keyInstuicao, 2);
    message += intToHex(new Date(object.timestampBegin).getMinutes(), 2); // Minuto de inicio
    
    message += intToHex(object.keyCampus, 2);
    message += intToHex(object.keyDisciplinaPrevious, 2);
    message += intToHex(object.keyDisciplinaNext, 2);
    message += intToHex(new Date(object.timestampEnd).getHours(), 2); // Hora de fim
    
    message += intToHex(object.keyHistorico, 2);
    message += intToHex(0, 2);
    message += intToHex(0, 2);
    message += intToHex(new Date(object.timestampEnd).getMinutes(), 2); // Minuto de fim
    
    console.log("Message: ", message.length);
    
    return message;
}

Evento = require("../models/evento");
Beacon = require("../models/beacon");
Instituicao = require("../models/instituicao");
Campus = require("../models/campus");

var __mosca;

var __getInstituicaoCampus = function(keyInstuicao, keyCampus, callback) {
    Instituicao.getByKey(keyInstuicao, function (err1, instituicao) {
        Campus.getByKey(keyCampus, function (err2, campus) {
            if(err1 || err2) {
                console.log("Erro ao pegar campus e instituicao");
            } else {
                callback(instituicao, campus);
            }
        })
    });
}

var __execTask = function() {
    Evento.getAll(function(err, eventos) {
        if(err) {
            console.log("Erro ao atualizar beacons!");
        } else {
            eventos.map(function(v) {
                Beacon.getByKey(v.keyBeacon, function(err, data) {
                    if(err || !data || data.length == 0) {
                        console.log("Erro ao atualizar evento!");
                    } else {
                        var beacon = data[0];

                        __getInstituicaoCampus(v.keyInstituicao, v.keyCampus, function (instituicao, campus) {

                            Evento.generateMessage(v, function (message) {
                                var topic = instituicao[0].name.toUpperCase() + "/" + campus[0].name.toUpperCase() + "/" + beacon.name;
                                console.log("Compartilhando o evento [" + message
                                    + "] com o beacon " + beacon.name + " width " + topic);
                                __mosca.publish(topic, message);
                            });
                        })
                    }
                })
            });
        }
    });
};

module.exports.start = function(routine, mosca) {
    __mosca = mosca;
    
    setInterval(function() {
        
        routine.map(function(taskHour) {
            __execTask();
        });
        
    }, 3 * 1000);
    
}
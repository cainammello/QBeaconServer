Evento = require("../models/evento");
Beacon = require("../models/beacon");

var __mosca;

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
                        console.log("Compartilhando o evento [" + Evento.generateMessage(v) + "] com o beacon " + beacon.name);
                        __mosca.publish("UFC/CAMPUS_QXD/" + beacon.name, Evento.generateMessage(v));
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
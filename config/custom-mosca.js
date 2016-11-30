var mosca = require('mosca');

var __pubsubsettings = {
    type: 'mongo',        
    url: 'mongodb://localhost/qbeacon_mosca_db',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var __moscaSettings = {
    port: 1884,           //mosca (mqtt) port
    backend: __pubsubsettings   //pubsubsettings is the object we created above 
};

var __server = null;

module.exports.init = function(callback) {
    __server = new mosca.Server(__moscaSettings);   //here we start mosca
    __server.on('ready', function() {
        console.log("The mosca server is up and running!");
        callback();
    });
    
    // fired when a message is published
    __server.on('published', function(packet, client) {
        console.log('Published', packet.payload.toString());
    });
    
    // fired when a client connects
    __server.on('clientConnected', function(client) {
        console.log('Client Connected:', client.id);
    });

    // fired when a client disconnects
    __server.on('clientDisconnected', function(client) {
        console.log('Client Disconnected:', client.id);
    });
};

module.exports.publish = function(topic, payload) {
    var message = {
        topic: topic,
        payload: payload, // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: false // or true
    };
    
    __server.publish(message, function() {
        console.log('Publicando payload ' + payload + ' on topic ' + topic);
    });
};
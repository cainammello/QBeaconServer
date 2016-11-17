module.exports.models = [
    "bloco", "campus", "disciplina", "docente", "instituicao", "sala", "util", "evento", historic
];

module.exports.getNewKey = function(model, maxKeyValue, callback) {
    maxKeyValue = maxKeyValue || 255;
    __getNewKey(model, maxKeyValue, 0, callback);
};  

module.exports.addWithKey = function(model, object, maxKeyValue, callback) {
    __addWithKey(model, object, maxKeyValue, callback);
};

var __addWithKey = function(model, object, maxKeyValue, callback) {
    __getNewKey(model, 255, 0, function(key) {
        object.key = key;
        model.create(object, callback);
    });
};

var __getNewKey = function(model, maxKeyValue, keyTest, callback) {
    if(keyTest > maxKeyValue) {
        callback(null);
        return;
    } 
            
    model.find({ key: keyTest }, function(err, result) {
        if(err) {
            callback(null);
        } else if(result.length > 0) {
            __getNewKey(model, maxKeyValue, keyTest + 1, callback);
        } else {
            callback(keyTest);
        }
    });
}
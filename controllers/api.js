
module.exports = function(app) {
    
    var __apiName = "api";
    var __models = require("../models/util").models;
    var __historico = require("../models/historico");
    
    
    app.get("/" + __apiName + "/recentHistoric/:timestamp" , function(request, response){
        __historico.getMostRecentlyHistorics(request.params.timestamp, function(err, data){
             if(err){
                 console.log(__historico + " - Erro ao tentar obter historico de atualizações");
             }else {
                 response.json(data);
             }
        });
    });
    
    __models.forEach(function(m) {
        
        var __modelName = m;
        var __dao = require("../models/" + __modelName + ".js");

        app.use(function(request, response, next) {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            response.header('Content-Type', 'application/json;charset=UTF-8');
            response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
            next();
        });

        app.get("/" + __apiName + "/" + __modelName, function(request, response) {
            __dao.getAll(function(err, data) {
                if(err) {
                    response.send(__modelName + " - Erro ao obter lista do banco!");  
                } else {
                    response.json(data);  
                }
            });
        });

        app.get("/" + __apiName + "/" + __modelName + "/:key", function(request, response) {
            __dao.getByKey(request.params.key, function(err, data) {
                if(err) {
                    response.send(__modelName + " - Erro ao obter objeto do banco with key: " + request.params.key);  
                } else {
                    response.json(data);  
                }
            });
        });

        app.post("/" + __apiName + "/" + __modelName, function(request, response) {
            var data = request.body;
            __dao.add(data, function(err, _data) {
                if(err) {
                    response.send(__modelName + "Erro ao inserir objeto no banco!");
                } else {
                    response.json(_data);
                }
            });
        });

        app.put("/" + __apiName + "/" + __modelName, function(request, response) {
            var data = request.body;
            __dao.update(data.key, data, {}, function(err, _data) {
                if(err) {
                    response.send(__modelName + "Erro ao atualizar objeto no banco!");
                } else {
                    response.json(_data);
                }
            });
        });

        app.delete("/" + __apiName + "/" + __modelName + "/:key", function(request, response) {
            __dao.delete(request.params.key, function(err, _data) {
                if(err) {
                    response.send(__modelName + "Erro ao deletar objeto no banco!");
                } else {
                    response.json(_data);
                }
            });
        });

        app.delete("/" + __apiName + "/" + __modelName + "", function(request, response) {
            __dao.deleteAll(function(err, _data) {
                if(err) {
                    response.send(__modelName + "Erro ao deletar objetos no banco!");
                } else {
                    response.json(_data);
                }
            });
        });
    
    })
    
};

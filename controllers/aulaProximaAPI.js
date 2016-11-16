
module.exports = function(app) {
    
    var __modelName = "aulaProxima";
    var __dao = require("../models/" + __modelName + ".js");
    
	app.use(function(request, response, next) {
		response.header('Access-Control-Allow-Origin', '*');
		response.header('Access-Control-Allow-Headers', 'Content-Type');
		response.header('Content-Type', 'application/json;charset=UTF-8');
		next();
	});

	app.get("/" + __modelName, function(request, response) {
        __dao.getAll(function(err, data) {
            if(err) {
                response.send(__modelName + " - Erro ao obter lista do banco!");  
            } else {
                response.json(data);  
            }
        });
	});
    
    app.post("/" + __modelName, function(request, response) {
		var data = request.body;
        __dao.add(data, function(err, bloco) {
            if(err) {
                response.send(__modelName + "Erro ao inserir objeto no banco!");
            } else {
                response.json(data);
            }
        });
	});
    
};

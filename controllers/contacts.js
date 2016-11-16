module.exports = function(app) {
    
    var operators = [
			{name: "Claro", code: "12", type: "celular", price: 2}, 
			{name: "Oi", code: "13", type: "celular", price: 2}, 
			{name: "Tim", code: "14", type: "celular", price: 4}, 
			{name: "Vivo", code: "15", type: "celular", price: 6}, 
			{name: "Embratel", code: "16", type: "fixo", price: 3}, 
			{name: "Telemar", code: "17", type: "fixo", price: 1}
		];
    var contacts = [
			{name: "Felipe", phone: "+55 (88) 99426 3541", color: "blue", date: new Date(), operator: operators[0]}, 
			{name: "Deinha", phone: "+55 (88) 99426 3542", color: "yellow", date: new Date(), operator: operators[1]}, 
			{name: "Marianna", phone: "+55 (88) 99426 3543", color: "green", date: new Date(), operator: operators[2]}, 
			{name: "Bruno", phone: "+55 (88) 99426 3544", color: "red", date: new Date(), operator: operators[3]}
		];

	app.use(function(request, response, next) {
		response.header('Access-Control-Allow-Origin', '*');
		response.header('Access-Control-Allow-Headers', 'Content-Type');
		response.header('Content-Type', 'application/json;charset=UTF-8');
		next();
	});

	app.get('/contacts', function(request, response) {
		response.json(contacts);
	});
    
    app.post('/contact', function(request, response) {
		var contact = request.body;
        contacts.push(contact);
        response.json(contact);
	});
    
    app.get('/operators', function(request, response) {
		response.json(operators);
	});

};

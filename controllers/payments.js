module.exports = function(app) {

	app.get('/payment', function(request, response) {
		var operators = [
			{name: "Claro", code: "12", type: "celular", price: 2}, 
			{name: "Oi", code: "13", type: "celular", price: 2}, 
			{name: "Tim", code: "14", type: "celular", price: 4}, 
			{name: "Vivo", code: "15", type: "celular", price: 6}, 
			{name: "Vivo", code: "16", type: "fixo", price: 3}, 
			{name: "Vivo", code: "17", type: "fixo", price: 1}
		];
		var contacts = [
			{name: "Felipe", phone: "+55 (88) 99426 3541", color: "blue", date: new Date(), operator: operators[0]}, 
			{name: "Deinha", phone: "+55 (88) 99426 3542", color: "yellow", date: new Date(), operator: operators[1]}, 
			{name: "Marianna", phone: "+55 (88) 99426 3543", color: "green", date: new Date(), operator: operators[2]}, 
			{name: "Bruno", phone: "+55 (88) 99426 3544", color: "red", date: new Date(), operator: operators[3]}
		];
		response.header('Access-Control-Allow-Origin', '*');
		response.json(contacts);
	});

	app.post('/payment', function(request, response) {
		var json = request.body;
		console.log(json);
		response.send("Payments\n");
	});

};

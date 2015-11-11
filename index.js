var http = require('http');
var dispatch = require('dispatch');


var server = http.createServer(
			dispatch({
				'/' : function(request, response) {
						message = {
							type: 'customer',
							text: 'Hi, how are you'
						};
						response.writeHead(200, {
							'Content-type': 'application/json',
							'Access-Control-Allow-Origin': 'http://127.0.0.1:9000'
						});
						response.end(JSON.stringify(message));
						console.log('Visiting %s', request.url);
						response.end('This is the root');
				},
				
			})
		);

server.listen(8081, function () {
	console.log('server running on 127.0.0.1:8081');
});
'use strict'​;
​ 	​const​
​ 	  net = require(​'net'​),
​ 	  server = net.createServer(connection => {
​ 	    ​// Use the connection object for data transfer.​
​ 	  });
​ 	server.listen(60300);
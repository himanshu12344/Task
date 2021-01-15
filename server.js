

var http = require('http'),
    app = require('./app'),
    server = http.createServer(app),
    port = process.env.PORT || 3005;

var Himanshu = function() {
    var self = this;

    self.setupVariables = function() {
        self.port = port;
    };
    self.start = function() {
        app.set('portNumber', port);
        server.listen(self.port, function() {
            console.log('Node server started on  ' + self.port + ' at ' + Date(new Date()));
        });
    };
};  
var Himanshu = new Himanshu();
Himanshu.setupVariables();
Himanshu.start();
process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });  
});
module.exports = server;

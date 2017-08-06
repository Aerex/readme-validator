var fork = require('child_process').fork;
var server = undefined;

function Application() {
}

Application.prototype.start = function (done) {
    server = fork(process.cwd() + '/index.js');
    server.on('message', function(msg){
        if(msg === 'listening'){
            done();
        }
    });
    return this;
};

Application.prototype.stop = function () {
    server.kill();
};



module.exports = Application;
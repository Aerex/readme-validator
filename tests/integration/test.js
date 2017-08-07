var Server = require('./server');
var app;
var context = process.env['TEST_ROUTE'] || 'http://localhost:39014';
var fs = require('fs');
var request = require('request');
var child = require('child_process');
var assert = require('chai').assert;

var validMarkdown = fs.readFileSync('tests/integration/resources/valid-readme.md', 'utf-8');
var schema = JSON.parse(fs.readFileSync('tests/integration/resources/schema.json', 'utf-8'));


describe('Validate README', function() {

	before(function(done) {
		app = new Server().start(done);
	});

	after(function() {
		app.stop();
	});

	it('should validate correct readme', function(done) {

		 var options = {
            url : context + '/validate',
            method : 'POST',
            headers : {
                'Content-type': 'application/json'
            },
            json : {
				md : validMarkdown,
				schema : schema
			}
        };
		
		request(options, function(err, res, body){
            if(!err && res.statusCode === 200){
                assert.isObject(body);
                assert.isTrue(body.status && body.status === 'PASS');
                assert.isArray(body.errors);
                assert.isTrue(body.errors.length === 0);

            } else {
                assert.isOk(false, 'This should not happen ' + err + body);
            }
            done();
        });
	});

	it('should validate correct readme through shell script', function(done){
		let json = {schema : schema, md: validMarkdown};
		
		child.execFile(process.cwd() + '/tests/integration/resources/run.sh', [context, JSON.stringify(json)], function(error, stdout, stderr){
			if(error){
				assert.isOk(false, 'This should not happen ' + err);
			} else {
				done();
			}
		});
	});
});
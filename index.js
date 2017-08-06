var express = require('express');
var Schema = require('./lib/schema');
var Parser = require('./lib/parser');
var Messages = require('./lib/messages');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();


app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));


app.post('/validate', function(req, res) {
	let docSchmea = req.body.schema || null;
	let markdownFile = req.body.md || null;
	
	markdownFile = fs.readFileSync('tests/integration/resources/sample.md', 'utf-8');

	if(!docSchmea){
		res.status(409).json({message: 'Document schema is not defined'});
		return;
	}

	if(!markdownFile){
		res.status(409).json({message: 'Markdown is not defined'});
	}


	let schema = new Schema(Messages, {definition: docSchmea});
	let parser = new Parser(schema, markdownFile);

	let result = parser.validate();

	res.status(200).json(result);

});


const PORT = process.env.PORT || 39014;


app.listen(PORT, function() {
	console.log('README validator has started');
	 if(process.send){
            process.send('listening');
	 }
});
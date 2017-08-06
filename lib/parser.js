(function(module) {

	var markdown = require('markdown').markdown;
	var Messages = require('./messages');
	var includes = require('lodash/includes');
	var CODES = require('./codes');
	var CONSTANTS = require('./constants');
	var actions = require('./actions');
	var Parser = module.exports = function Parser(_schema, _md) {
		this.schema = _schema;
		this.md = _md;

	};

	Parser.prototype.validate = function() {
		let validationObject = {},
			currentHeader = {},
			currentType,
			validationResult = {},
			resolvedSchema,
			messages = [],
			schemaTypes = [],
			cursor = 2;
		let schemaValidationResponse = this.schema.validate();

		if(schemaValidationResponse.length > 0){
			validationObject.status = 'FAIL';
			validationObject.errors = schemaValidationResponse;
			return validationObject;
		}

		let tree = markdown.parse(this.md);

		if(tree.length === 1 && tree[0] === 'markdown'){
			Messages.add(CODES.INVALID_SCHEMA, {isJSON: false});
			validationObject.status = 'FAIL';
			validationObject.errors = Messages.get();
			return validationObject;
		}

		if(tree[1][0] !== CONSTANTS.HEADER && tree[1][1].level !== 1){
			Messages.add(CODES.MISSING_TITLE);
			validationObject.status = 'FAIL';
		}

		resolvedSchema = this.schema.getResolveSchema();
		schemaTypes = Object.keys(resolvedSchema);
		currentHeader = {};

		while(cursor < tree.length){

			currentType = tree[cursor][0];

			if(typeof(actions[currentType]) === 'function'){
				currentHeader = actions[currentType](Messages, tree[cursor].slice(1), resolvedSchema, currentHeader);
			}

			cursor++;

		}

		schemaTypes.forEach(function(type){
			if(resolvedSchema[type].required && resolvedSchema[type].required.length > 0){
				for(var i = 0; i < resolvedSchema[type].required.length; i++){
					Messages.add(CODES.MISSING_SECTION, {name: resolvedSchema[type].required[i]});
				}
			}
		});

		messages = Messages.get();
		Messages.clear();

		if(messages.length > 0){
			validationResult.status = CONSTANTS.FAIL;
			validationResult.errors = messages;
		} else {
			validationResult.status = CONSTANTS.PASS;
			validationResult.errors = [];
		}

		return validationResult


	};
})(module)
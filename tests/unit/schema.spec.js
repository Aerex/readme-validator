var chai = require('chai');
var assert = require('chai').assert;
var fs = require('fs');
var Schema = require('../../lib/schema');
var Messages = require('../../lib/messages');

describe('#Schema', function() {
	describe('#isValid', function() {
		it('should get positive validation for schema (json)', function() {
			var doc = fs.readFileSync('tests/unit/resources/schema.json', 'utf-8');
			var schema = new Schema(Messages, {definition: doc});
			
			var validationObject = schema.validate();

			assert.isArray(validationObject);
			assert.equal(validationObject.length, 0);
		});

		it('should get positive validation for schema (json-string)', function() {
			var schema = new Schema(Messages, {definition: '{\"type\": \"A\"}'});
			var validationObject = schema.validate();

			assert.isArray(validationObject);
			assert.equal(validationObject.length, 0);


		});

		it('should return false if empty json', function() {
			var schema = new Schema(Messages, {definition: {}});
			var validationObject = schema.validate();
			assert.isArray(validationObject);
			assert.equal(validationObject.length, 1);
		});

		it('should return false if not valid json (string)', function() {
			var schema = new Schema(Messages, {definition: 'not a schema'});
			var validationObject = schema.validate();
			assert.isArray(validationObject);
			assert.equal(validationObject.length, 1);
		});

		it('should return false if null', function() {
			var schema = new Schema(Messages, {definition: null});
			var validationObject = schema.validate();
			assert.isArray(validationObject);
			assert.equal(validationObject.length, 1);
		});

		it('should return false if undefined', function() {
			var schema = new Schema(Messages, {definition: undefined});
			var validationObject = schema.validate();
			assert.isArray(validationObject);
			assert.equal(validationObject.length, 1);

			schema = new Schema(Messages);
			validationObject = schema.validate();
			assert.isArray(validationObject);
			assert.equal(validationObject.length, 1);
		});

		it('should return false if number', function() {
			var schema = new Schema(Messages, {definition: 1});
			var validationObject = schema.validate();
			assert.isArray(validationObject);
			assert.equal(validationObject.length, 1);
		});
	});
});
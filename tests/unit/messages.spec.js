var chai = require('chai');
var assert = require('chai').assert;
var Parser = require('../../lib/parser');
var Schema = require('../../lib/schema');
var CODES = require('../../lib/codes');
var Messages = require('../../lib/messages');
var fs = require('fs');

describe('#getMessage', function() {

	afterEach(function() {
		Messages.clear();
	})
	const sectionName = 'Section One';

	it('should return correct message object for missing section code', function() {
		let expectedMessageObject = [{
			code : CODES.MISSING_SECTION,
			message: 'There is a missing `' + sectionName + '` section'
		}];
		
		 Messages.add(CODES.MISSING_SECTION, {name: sectionName});
		let actualMessageObject = Messages.get();

		assert.deepEqual(expectedMessageObject, actualMessageObject);
	});

	it('should return correct message object for wrong header for section code', function() {
		let expectedMessageObject = [{
			code : CODES.WRONG_HEADER_FOR_SECTION,
			message: '`' + sectionName + '` section is expecting h3 header but got h1 header'
		}];

		Messages.add(CODES.WRONG_HEADER_FOR_SECTION, {name: sectionName, expected: 'h3 header', actual: 'h1 header'});
		let actualMessageObject = Messages.get();

		assert.deepEqual(expectedMessageObject, actualMessageObject);

	});

	it('should return correct message object for invalid section type', function() {
		let expectedMessageObject = [{
			code : CODES.INVALID_SECTION_TYPE,
			message: '`' + sectionName + '` section is expecting list but got blob'
		}];

		Messages.add(CODES.INVALID_SECTION_TYPE, {name: sectionName, expected: 'list', actual: 'blob'});
		let actualMessageObject = Messages.get();

		assert.deepEqual(expectedMessageObject, actualMessageObject);
	});

	it('should return correct message object for invalid schema (undefined)', function() {
		let expectedMessageObject = [{
			code : CODES.INVALID_SCHEMA,
			message: 'Schema is undefined or not a string/object'
		}];

		Messages.add(CODES.INVALID_SCHEMA, {isJSON: false});
		let actualMessageObject = Messages.get();

		assert.deepEqual(expectedMessageObject, actualMessageObject);
	});

	it('should return correct message object for invalid schema (not a valid json)', function() {
		let expectedMessageObject = [{
			code : CODES.INVALID_SCHEMA,
			message: 'Schema is not a valid JSON'
		}];

		Messages.add(CODES.INVALID_SCHEMA, {isJSON: true});
		let actualMessageObject = Messages.get();

		assert.deepEqual(expectedMessageObject, actualMessageObject);
	});
	
	it('should return correct message object for missing title code', function() {
		let expectedMessageObject = [{
			code : CODES.MISSING_TITLE,
			message: 'Missing h1 header title for repository'
		}];

		Messages.add(CODES.MISSING_TITLE);
		let actualMessageObject = Messages.get();

		assert.deepEqual(expectedMessageObject, actualMessageObject);
	});

});
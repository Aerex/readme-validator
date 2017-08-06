var chai = require('chai');
var assert = require('chai').assert;
var Parser = require('../../lib/parser');
var Schema = require('../../lib/schema');
var CODES = require('../../lib/codes');
var Messages = require('../../lib/messages');
var fs = require('fs');

describe('#parser', function() {
	describe('#validate ', function() {
		const FAIL_STATUS = 'FAIL';
		const PASS_STATUS = 'PASS';
		it('should get a valid section', function() {
			let installationSchema = {
				header: {
					required: ['Installation'],
					three : {
						'Installation': {
							types : ['list']
						}
					}
				}
			};

			let schema = new Schema(Messages, {definition: installationSchema});

			let sampleMD = '#Title\n###Installation\n 1. Step One\n 2. Step Two';

			let parser = new Parser(schema, sampleMD);
			let validationObject = parser.validate();

			assert.isObject(validationObject);
			assert.equal(validationObject.status, PASS_STATUS);
			assert.equal(validationObject.errors.length, 0, 'should no errors');

		});

		it('should have errors in response if no section', function() {
			let installationSchema = {
				header: {
					required: ['Installation'],
					three : {
						'Installation': {
							types : ['list']
						}
					}
				}
			};

			var expectedErrors = [
				{
					code: CODES.MISSING_SECTION,
					message: "There is a missing `Installation` section"
				}
			];

			let schema = new Schema(Messages, {definition: installationSchema});
			let sampleMD = '#Title\n####NO INSTALLATION';
			let parser = new Parser(schema, sampleMD);
			let validationObject = parser.validate();

			assert.isObject(validationObject);
			assert.equal(validationObject.status, FAIL_STATUS);
			assert.isAbove(validationObject.errors.length, 0, 'should have at least one error');
			assert.deepEqual(validationObject.errors, expectedErrors);
		});

		it('should have errors in response if invalid section (wrong header)', function() {
			let installationSchema = {
				header: {
					required: ['Installation'],
					three : {
						'Installation': {
							types : ['para']
						}
					}
				}
			};

			let expectedErrors = [
				{
					code: CODES.WRONG_HEADER_FOR_SECTION,
					message: "`Installation` section is expecting h3 header but got h1 header"
				}
			];


			let schema = new Schema(Messages, {definition: installationSchema});
			const sampleMD = '#Title\n#Installation\n Sample Installation Text';
			let parser = new Parser(schema, sampleMD);
			let validationObject = parser.validate();

			assert.isObject(validationObject);
			assert.equal(validationObject.status, FAIL_STATUS);
			assert.isAbove(validationObject.errors.length, 0, 'should have at least one error');
			assert.deepEqual(validationObject.errors, expectedErrors);
		});

		it('should have errors in response if content of section is invalid', function() {
			let installationSchema = {
				header: {
					required: ['Installation'],
					three : {
						'Installation': {
							types : ['list']
						}
					}
				}
			};

			let expectedErrors = [
				{
					code: CODES.INVALID_SECTION_TYPE,
					message: '`Installation` section is expecting list but got para'
				}
			];


			let schema = new Schema(Messages, {definition:installationSchema});
			const sampleMD = '#Title\n### Installation\n Sample Installation Text';
			let parser = new Parser(schema, sampleMD);
			let validationObject = parser.validate();

			assert.isObject(validationObject);
			assert.equal(validationObject.status, FAIL_STATUS);
			assert.isAbove(validationObject.errors.length, 0, 'should have at least one error');
			assert.deepEqual(validationObject.errors, expectedErrors);
		});

		it('should have multiple errors in response if content of section is invalid and invalid section', function() {
			let installationSchema = {
				header: {
					required: ['Installation'],
					three : {
						'Installation': {
							types : ['list']
						}
					}
				}
			};

			let expectedErrors = [
				{
					code: CODES.WRONG_HEADER_FOR_SECTION,
					message: "`Installation` section is expecting h3 header but got h1 header"
				},
				{
					code: CODES.INVALID_SECTION_TYPE,
					message: '`Installation` section is expecting list but got para'
				}
			];


			let schema = new Schema(Messages, {definition: installationSchema});
			const sampleMD = '#Title\n# Installation\n Sample Installation Text';
			let parser = new Parser(schema, sampleMD);
			let validationObject = parser.validate();

			assert.isObject(validationObject);
			assert.equal(validationObject.status, FAIL_STATUS);
			assert.equal(validationObject.errors.length, 2, 'should have two errors');
			assert.deepEqual(validationObject.errors, expectedErrors);
		});

		it('should have an error if schema is undefined', function() {

			let expectedErrors = [
				{
					code: CODES.INVALID_SCHEMA,
					message: 'Schema is undefined or not a string/object'
				}
			];


			let schema = new Schema(Messages, {definition: undefined});
			const sampleMD = '### Installation\n Sample Installation Text';
			let parser = new Parser(schema, sampleMD);
			let validationObject = parser.validate();

			assert.isObject(validationObject);
			assert.equal(validationObject.status, FAIL_STATUS);
			assert.equal(validationObject.errors.length, 1, 'should have one error');
			assert.deepEqual(validationObject.errors, expectedErrors);
		})
	});

	it('should have an error if schema is defined but not a valid json', function() {
			let installationSchema = {};


			let expectedErrors = [
				{
					code: CODES.INVALID_SCHEMA,
					message: 'Schema is not a valid JSON'
				}
			];


			let schema = new Schema(Messages, {definition: installationSchema});
			const sampleMD = '### Installation\n Sample Installation Text';
			let parser = new Parser(schema, sampleMD);
			let validationObject = parser.validate();

			assert.isObject(validationObject);
			assert.equal(validationObject.status, 'FAIL');
			assert.equal(validationObject.errors.length, 1, 'should have one error');
			assert.deepEqual(validationObject.errors, expectedErrors);
	});

});
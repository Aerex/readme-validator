(function(module) {

	var messages = [];
	var CODES = require('./codes');
	var format = require('string-format');

	/**
	 * Clear all messages
	 * @private
	 */
	var _clear = function() {
		messages = [];
	};

	/**
	 * Add a message to the message queue
	 * @param code The message code
	 * @param options options passed to modify message structure
	 * @private
	 */
	var _add = function(code, options) {
		let message = {};
		switch(code){
			case 'MISSING_SECTION':
				message.code = CODES.MISSING_SECTION;
				message.message = format('There is a missing `{name}` section', {name: options.name});
				messages.push(message);
				break;
			case 'WRONG_HEADER_FOR_SECTION':
				message.code = CODES.WRONG_HEADER_FOR_SECTION;
				message.message = format('`{name}` section is expecting {expected} but got {actual}',
					{name: options.name, expected: options.expected, actual: options.actual});
				messages.push(message);
				break;
			case 'INVALID_SECTION_TYPE':
				message.code = CODES.INVALID_SECTION_TYPE;
				message.message = format('`{name}` section is expecting {expected} but got {actual}',
					{name: options.name, expected: options.expected, actual: options.actual});
				messages.push(message);
				break;
			case 'INVALID_SCHEMA':
				message.code = CODES.INVALID_SCHEMA;
				if(options.isJSON){
					message.message = 'Schema is not a valid JSON';
				} else {
					message.message = 'Schema is undefined or not a string/object';
				}

				messages.push(message);
				break;
			case 'MISSING_TITLE':
				message.code = CODES.MISSING_TITLE;
				message.message = 'Missing h1 header title for repository';
				messages.push(message);
				break;

		}
	};

	/**
	 * Return the messages
	 * @returns {Array}
	 * @private
	 */
	var _get = function(){
		return messages;
	};

	module.exports = {
		clear : _clear,
		add : _add,
		get : _get
	}
})(module);
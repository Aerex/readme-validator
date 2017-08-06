(function(module) {
	var CODES = require('./codes');
	/** This module initializes and validate the README schema
	 *
	 * @param message the Message module
	 * @param options.definition the readme parse schema
	 * @type {module.Schema}
	 */
	var Schema = module.exports = function Schema(_message, options){
		this.definition = options && options.definition || null;
		this.Message = _message || {};
	};

	/**
	 * Resolve the schema by parse the JSON if it is stringified or return the JSON
	 * @returns {json}
	 */
	Schema.prototype.getResolveSchema = function() {
		let resolvedSchema = null;
		if(typeof(this.definition) === 'object'){
			return this.definition;
		} else if(typeof(this.definition) === 'string'){
			try {
				resolvedSchema =  JSON.parse(this.definition);
			} catch(e){console.error(e)}

		}
		return resolvedSchema;
	};

	/**
	 * Validates the Schema. If an error return a message object
	 * @returns {module.Message}
	 */
	Schema.prototype.validate = function(){
		let Message = this.Message;
		if(!this.definition || typeof(this.definition) === 'number'){
			if(!Message){
				throw Error('Message module is not defined');
			} else {
				Message.add(CODES.INVALID_SCHEMA, {isJSON: false});
			}

		} else if(typeof(this.definition) === 'object' && Object.keys(this.definition).length === 0){
			if(!Message){
				throw Error('Message module is not defined');
			}

			Message.add(CODES.INVALID_SCHEMA, {isJSON: true});
		} else if(typeof(this.definition) === 'string'){
			try {
				JSON.parse(this.definition);
			} catch (e){
				Message.add(CODES.INVALID_SCHEMA, {isJSON: true});
			}
		}

		let messages = Message.get();
		Message.clear();

		return messages;

	};
})(module);
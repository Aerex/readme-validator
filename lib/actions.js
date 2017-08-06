(function(module){
	const CODES = require('./codes');
	const CONSTANTS = require('./constants');
	const _ = require('lodash');

	function _checkContentStructure(Messages, schema, snippetType, currentHeader){
		let headerLabel = currentHeader[1];
		let regExp = null;
		let isValidType = false;

		if(schema){
			if(_.isArray(schema.types)){
				schema.types.forEach(function(type) {
					regExp = new RegExp(type);
					if(regExp.test(snippetType)){
						isValidType = true;
					}
				});
				if(!isValidType) {
					Messages.add(CODES.INVALID_SECTION_TYPE, {
						name: headerLabel,
						expected: schema.types.join(' or '),
						actual: snippetType
					});
				}

			}
		}

	}

	function _headerMap(level, isLabel) {
		let result;

		if(!isLabel) {
			switch (level){
				case 1:
					result = 'one';
					break;
				case 2:
					result = 'two';
					break;
				case 3:
					result =  'three';
					break;
				case 4:
					result = 'four';
					break;
				case 5:
					result = 'five';
					break;
				case 6:
					result = 'six';
					break;
				default :
					result = 'one';

			}
		} else {

			switch(level) {
				case 'one':
					result = '1';
					break;
				case 'two':
					result = '2';
					break;
				case 'three':
					result = '3';
					break;
				case 'four':
					result = '4';
					break;
				case 'five':
					result = '5';
					break;
				case 'six':
					result = '6';
					break;
				default:
					result = '1';

			}

		}

		return result;
	}
	var _header = function(Messages, snippet, schema){
		let level = _headerMap(snippet[0].level, false);
		let label = snippet[1];
		const headerLevels = ['one', 'two', 'three', 'four', 'five', 'six'];
		let isWrongSection = false;


		let content = schema['header'] && schema['header'][level] && schema['header'][level][label];

		// verify that label is the right header type
		if(!content){
			headerLevels.forEach(function(l){
				if(level !== l && schema['header'][l] && schema['header'][l][label]){
					Messages.add(CODES.WRONG_HEADER_FOR_SECTION, {name: label, actual: 'h' + _headerMap(level, true) + ' header',
						expected: 'h' + _headerMap(l, true) + ' header'});
					isWrongSection = true;
					snippet.wrongSection = schema['header'][l][label];
				}
			});
		}

		if (content || isWrongSection) {
			if(schema['header'].required){
				schema['header'].required = _.pull(schema['header'].required, label);
			}
		}

		return snippet;

	};

	var _numberlist = function(Messages, snippet, schema, currentHeader) {
		let headerLevel = _headerMap(currentHeader[0].level, false);
		let headerLabel = currentHeader[1];

		let contentSchema = schema['header'] && schema['header'][headerLevel] && schema['header'][headerLevel][headerLabel];

		_checkContentStructure(Messages, contentSchema, 'numberlist', currentHeader);

		_checkContentStructure(Messages, currentHeader.wrongSection, 'numberlist', currentHeader);

		//TODO: Validate numberlist content??

		return currentHeader;
	};

	var _para = function(Messages, snippet, schema, currentHeader) {
		let headerLevel = _headerMap(currentHeader[0].level, false);
		let headerLabel = currentHeader[1];

		let contentSchema = schema['header'] && schema['header'][headerLevel] && schema['header'][headerLevel][headerLabel];

		_checkContentStructure(Messages, contentSchema, 'para', currentHeader);

		_checkContentStructure(Messages, currentHeader.wrongSection, 'para', currentHeader);

		//TODO: Validate para content???

		return currentHeader;
	};

	var _bulletlist = function(Messages, snippet, schema, currentHeader) {
		let headerLevel = _headerMap(currentHeader[0].level, false);
		let headerLabel = currentHeader[1];

		let contentSchema = schema['header'] && schema['header'][headerLevel] && schema['header'][headerLevel][headerLabel];

		_checkContentStructure(Messages, contentSchema, 'bulletlist', currentHeader);

		_checkContentStructure(Messages, currentHeader.wrongSection, 'bulletlist', currentHeader);

		//TODO: Validate bulletlist content???

		return currentHeader;
	};

	module.exports = {
		header : _header,
		numberlist : _numberlist,
		para: _para,
		bulletlist : _bulletlist
	}

})(module);

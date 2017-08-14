# Readme-Validator

A NPM module that validates a README.md based on a schema provided. 


## Project Badges

* Build Status : [![Build Status](https://travis-ci.org/Aerex/readme-validator.svg?branch=master)](https://travis-ci.org/Aerex/readme-validator)

## Installation

`npm install --save readme-validator`

## Usages

```javascript
const Schema = require('readme-validator').Schema;
const Messages = require('readme-validator').Messages;
const Parser = require('readme-validator').Parser;

const sampleMD = '#Title\n### Installation\n Sample Installation Text';

let installationSchema = {
        header: {
            required: ['Installation'],
                three : {
                    Installation: {
                        types : ['list']
                    }
                }
            }
};

let schema = new Schema(Messages, {definition: installationSchema});
let parser = new Parser(schema, sampleMD);
let validationObject = parser.validate();

console.log(JSON.stringify(validationObject));

/**

{
    "status": "FAIL",
    "errors": [
        {
            "code": "INVALID_SECTION_TYPE",
            "message": "`Installation` section is expecting list but got para"
        }
    ]
}

*/

```

## API

### Messages

A module that reports errors or warnings that can presented to the user after validation. The message module API documentation can be found here :

[Documentation](docs/messages.md)

 
### Schema

A module that sets the schema used to validate the README

| Parameters         | Description                    |
|--------------------|--------------------------------|
| Messages           | The Messages module            |
| options.definition | The JSON or stringified JSON of the schema|
 

### Parser

A module that validates the README

Create an instance of Parser module `new Parser(Schema, file)`

| Parameters | Description                  |
|------------|------------------------------|
| Schema     | An instance of Schema module |
| file       | The README.md string         |

Validate the readme `parserInstance.validate()` and returns a JSON response like the following:

```
{
    "status": "PASS",
    "details": {
        "errors": []
    }
}

...
 
{
    "status": "FAIL",
    "errors": [
        {
            "code": "INVALID_SECTION_TYPE",
            "message": "`Installation` section is expecting list but got para"
        }
    ]
}
```



## Testing

### Integration 

To run the integration test run the following command

`npm run integration`

### Unit

To run the unit tests run the following command

`npm test`

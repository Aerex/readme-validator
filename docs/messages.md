## Messages

A module that reports errors or warnings that can presented to the user after validation.

## Messages.add(code, options)

Adds a message to the messages queue.

| Parameters | Description                  |
|------------|------------------------------|
| code     | The error code   |
| options       | options to configure message         |


List of error codes are as follows:

* MISSING_SECTION
    * If schema is missing a header section
* WRONG_HEADER_FOR_SECTION
     * If the README header section is using the wrong header type (e.g. expected h1 but got h2)
* INVALID_SECTION_TYPE
    * If the content structure of the section is incorrect (e.g. expected a paragraph but got a bulletlist)
* INVALID_SCHEMA
    * If the Schema is not defined, not a JSON or a valid JSON string
* MISSING_TITLE
    * Missing h1 title in header
    
## Messages.get()
    
Gets an array of messages


## Messages.clear()

Clears the array of messages
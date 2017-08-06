# codegen-generator-bff-mobile

### Installation

1. Install [Yeoman](http://yeoman.io)

	```bash
	npm install -g yo
	```

2. Clone this repository
3. Run `npm link` inside the repository directory:
4. Change into a new directory and generate your project with:

	```bash
	yo @arf/bff-mobile
	```

### Configuration

Following command line arguments are supported
* `--bluemix {stringified-json}` -  used by Scaffolder to supply project information from `pman`. In case this argument is omitted the information will be taken from `default_bluemix.js` file. This will be referred as `projectConfig` in this document.

* `--starter {stringified-json}` -  used by Scaffolder to supply  generator options from Starter's blueprint.json. In case this argument is omitted the information will be taken from `default_starter.js` file. This will be referred as `starterConfig` in this document.

* `--debug` - prints additional debug information

* `--force` - overrides files without asking

### General structure
Following folders are available under `/templates`
* `cloudfoundry` - this is where all the CloudFoundry specific files are, e.g. `manifest.yml`
* `swagger-ui` - the swagger-ui web app.
* `node-app` - template for the Node.js application

### CloudFoundry
The `manifest.yml` file will be templatized according to projectConfig. When running on Bluemix application is expected to be bound to service instances provisioned in the project as specified in `manifest.yml`.

### Docker
Nothing here.

### Local development
Binding to service instance is not possible when running locally. This usecase should be addressed differently by each language.

#### Node.js
localdev.js file is loaded on application startup. In case VCAP_SERVICES environment variable is not present (which means application is NOT running on bluemix), it will be faked by localdev.js file. The content of localdev.js file, specifically the service credentials, is coming from projectConfiguration.  

> Note that the localdev.js file should NEVER be pushed to source control. Therefore it is added to `.gitignore`.

#### Java
Nothing here

#### Swift
Nothing here
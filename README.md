This is the skeleton project for my BDD workshop for RIAs development with JavaScript

For more information about the workshop visit http://www.carlosble.com/2013/01/workshop-bdd-for-ria-with-javascript/


Installation instructions:

  - Install node.js: http://nodejs.org/

  - Install express: npm install express

  - Install jade: npm install jade

  - Install chai: npm install chai

  - Install jasmine-node: npm install jasmine-node

  - Install CoffeeScript: sudo npm install -g coffee-script (sudo only for linux users)

  - Compile: build.sh

  - Install CasperJs: for instructions see http://casperjs.org/ (PhantomJs needs to be installed first)



Getting ready for the workshop: (exercises to do before attending)

  - Run the tests in the browser: just open runTests.html file with the browser

  - Run the tests in the command-line: ./runUnitTestsNode.sh

  - Don't worry about jsTestDriver, we will see that during the workshop

  - Try to understand the tests under the spec folder. Just the files starting with "intro". The other files are there for the workshop. 

  - Try to delete part of the tests or the production code and then try to make them pass again


Introduction to Specification by Example:

  - Make sure port 3000 is free for the server to run (other servers might be running already)

  - Start the server: node server.js

  - Run the tests in the browser: http://localhost:3000/test/acceptanceTestRunner.html

  - Run the tests in the command-line: casperjs spec/casperSpec.js

#############################################################
Installation directory:

Phantom.js: /usr/local/Cellar/phantomjs/1.7.0
Casper.js:  /usr/local/Cellar/casperjs/1.0.0-RC3
Coffee: /usr/local/lib/node_modules/coffee-script


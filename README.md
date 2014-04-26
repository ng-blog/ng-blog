ng-blog
=======

Angular-Deployd Blog App


Steps to Install ng-blog 
-------------------------

**Note: If you already have nodejs, and grunt-cli installed skip over steps 1 & 2**

1. Install nodejs - [http://nodejs.org](http://nodejs.org)
1. From command line install grunt-cli: npm install -g grunt-cli
1. From command line install deployd: npm install -g deployd
    - **Note for Mac Users**: If you install Deployd on Mac via npm and you installed mongodb with Homebrew use [this work around](https://github.com/deployd/deployd/issues/229):
        - /path/to/node_modules/deployd/lib/util/mongod.js and append '-f', '/dev/null' to the options array
        - If you don't do this Deployd will hang and ironically, never deploy. A fix was [pushed to master](https://github.com/deployd/deployd/pull/232) but apparently never pushed to the npm project. 
1. From command line run inside of the project's root directory: npm install
1. From command line run: bower install
1. From command line run: grunt build
1. While inside the ng-blog directory, run deployd from the command line: 
    - Type: cd dist && dpd
	- A message should appear indicating it is running on http://localhost:2403
1. In browser visit http://localhost:2403/dashboard and add data to Users and Posts collections
	- It is point and click here.  
		- Under "Resources" select a collection by clicking on it, either Users or Posts, 
		- Click on Data and add data to each collection
1. Once you've completed these steps, in browser visit: http://localhost:2403
1. You should see your posts
1. Click on "Login" - enter your username and password you entered in the Users collection
1. Fin.




After Install Updates
----------------------

1. The email resource will need to have the proper SMTP credentials added to it. Currently it has fake non-functioning gmail credentials.

Todo
====
1. Add grunt-contrib-symlink and have it create public symlink to either bin or build depending on operation
1. Add db data validation
1. Pagination on Blog page
1. Image delete
1. Image insertion on post create/edit






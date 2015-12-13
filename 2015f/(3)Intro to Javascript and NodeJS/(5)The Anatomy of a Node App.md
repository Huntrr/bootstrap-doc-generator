A common Node app has several main components, as described below:

_app.js:_ The main file, and the first one to be read. At the beginning, this file initializes the functionality described in the Node modules. The last section tells the app to run on a particular [port](https://answers.yahoo.com/question/index?qid=20080617203733AA9kwiT) (3000 in this case).

_package.json:_ A standardized JSON file containing information about this app. It's fairly readable, but there's info about the authors, app version and versions of Node modules used.

_node_modules:_ This is a folder which contains external modules, which are snippets of code written by others that perform very specific functions within your code. These are really what make Node so powerful and flexible—you can easily import functionality written by other people. You can look through Node modules on http://www.npmjs.org, or just Google functionality you want and look for modules that perform that function. To add a new Node module to your program, type "npm install [[module_name]]" in the main directory of your program.

One very common module is called Express. It provides a lot of the framework required to make our app work over the Internet.

_public:_ Holds CSS, Javascript, image, and video files used to render web pages.

_routes:_ Contains the routing files. Think of each existing URL contained in a website as a route (website.com/home and website.com/contact). Files in this folder contain information on how handle requests made to specific routes on the site.

_views:_ Contains files that are actually rendered. This folder contains HJS, or Hogan.js, files. HJS is essentially HTML, but with a few extra features that make it easier to use. This lets us populate HTML with variables that are determined depending on the nature of te request made from a browser to our server.

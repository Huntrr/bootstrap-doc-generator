Let's talk about a file called routes.js. This handles all the "middleware routing": that our app has to do. So basically it tells our app what to do when someone goes to google.com/mail or to google.com/maps, ie, it specifies the behavior and results for making GET/POST requests at different routes (or paths). To begin with, as usual, we'll get the Express variable. Except this time, we'll specify a new variable called router which is created as folows:

```javascript
var express = require('express');
var router = express.Router();
```

A router is an isolated instance of middleware and routes provided in Express. In other words, it's simply a collection of middleware functions devoted to indentifying routes, parsing the path they are sent on, and handling them accordingly.

Routers behave like middleware themselves and can be `.use()`d by the app or in other routers. Think back to `app.js`, and how we did exactly that for the 'route handler' - which we are about to write now.

We'll now make simple route definitions for the HTTP GET method as below:

```javascript
// catches all requests on the path '/'
router.get('/', function(req, res) {
return res.render('index', {
title: 'Codeweekend Notes',
notes: req.session.notes
});
});

// catches all requests on paths like '/123', '/123456' and even '/dragons'
router.get('/:id', function(req, res) {
var noteId = Number(req.params.id);
if (isNaN(noteId) || noteId < 1 || noteId > req.session.notes.length) {
req.session.message = 'That note does not exist!';
return res.redirect('/');
}

return res.render('note', {
note: req.session.notes[noteId - 1]
});
});
```

Writing a handler for an HTTP POST request is just as straightforward:

```javascript
router.post('/create', function(req, res) {
if (!(req.body.title && req.body.body)) {
req.session.message = 'You must provide a title and a body!';
return res.redirect('/');
}

req.session.notes.push({
id: req.session.notes.length + 1,
title: req.body.title,
body: req.body.body
});

req.session.message = 'Note created!';
return res.redirect('/');
});
```

You'll notice that the first function specifies what is supposed to happen when a  simple route path is requested (such as '/'). Each call to `router.get` or `router.post` takes a callback function that has two objects `req` and `res`. The `req` object usually contains information that is containted in the request. It also gives us access to the session cookie so that we can access and store some information about the user in their browser. The `res` object let's us control the response. Thus `res.redirect` redirects the user to another page and `res.render` uses our templating engine to create a webpage that we send back to the user. 

Whenever we have an error in the request made to our webapp, we can see that we store the error message into the session and return a redirect back to the simple routing path using this nifty structure inside the callback functions:

```javascript
req.session.message = 'Error message goes here';
return res.redirect('/');
```

This allows for clean error handling since we always send users to the same page when they get an error, and the actual error message is bound to the user's cookie, not the page itself.

And lastly, just so that we get all this handy code available to the rest of the application, let's export it so that it's created when we 'require' it in another file with:

```javascript
module.exports = router;

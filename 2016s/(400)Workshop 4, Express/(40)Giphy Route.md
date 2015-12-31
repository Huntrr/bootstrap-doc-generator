Another cool feature of Express is routing. You can think of a route as
a definition for how the HTTP server should handle an HTTP request to a specific
URL. For example, Google might have a route that handles `GET` requests to the
url `google.com/search/<query>` where `<query>` is some arbitrary search term.
Facebook might (but doesn't) have a route that handles `POST` requests to the
url `facebook.com/status/new/<status>`, where `<status>` is the status update.
Complicated production web applications have many many routes. Some will perform
database manipulation. Others might act on the `res` (response) object to
`res.render` a view, kind of like our `404` handler. Others still might `BREW`
a cup of tea or return an error `418` if coffee were requested.

For our purposes, we're going to stick to a simple HTTP `get` requests that uses
the Giphy API to resolve a search term into a `.gif` (please pronounce `.gif`
with a soft 'g', as in 'giraffe'). 

First, open up `server/server.js` and replace `// TODO: Routes` with this code.

```javascript
let routes = require('./routes');
app.use('/', routes);
```

This code `require`s a new module (from `./routes.js`) and then tells Express to
use this file whenever a request is made to a child of the `/` URL (so,
essentially, any request). If we wanted to, we might `.use` different route
files for different endpoints, like instead of having all handled at the `/`
level, we might have one route handler that handles routes to `/user/` and
another that handles routes to `/blog/`, etc. For now though, we only have
a single route, so this setup makes sense.

To finalize the setup, we need to actually build our `routes.js` handler.
Please create a `server/routes.js` file and fill it like this:

```javascript
'use strict';

let giphy = require('giphy-api')();
let express = require('express');
let router = express.Router();

router.get('/test', (req, res) => {
  return res.send('Test route');
});

module.exports = router;
```

As you can see, this code does a couple things. It `require`s the `giphy-api`
(we'll use that later) and then `require`s Express, grabbing Express's router.

Then it builds on that router, using `router.get` to create a `/test` route.
Indeed, we could just as easily used the `router.post` or `router.put`
function, as Express's router is, again, built to handle all kinds of HTTP
verbs (but since we're creating a simple endpoint, `router.get` is sufficient).

This route is very simple. It responds to `GET` requests pointed at `/test`.
When express gets a request like this, it calls the second parameter to the
function, an anonymous function that takes a `req` (request) and `res`
(response) as its parameters. The `req` contains all kinds of information about
the request, we'll see how to use it later, while the `res` object contains
functions to perform on the upcoming response. In this case, we return
`res.send('Test route');` which just responds to the request with raw text. If
we run the server now, and navigate to `localhost:3000/test`, we'd see the
words `Test route` on the screen. We could just as easily have set up the
`res.send` to serve an HTML file or, if we wanted to be super fancy, we could
have used `res.render` to render another view. But, for now, this is simple
enough.

Finally, the code does `module.exports = router`. Like in `user.js`, this
export sets the result of `require('./routes')`. In this case, we set it to our
`router`, so that Express can consume the routing information and handle the
routes we define in this file.

#### But what about Giphy?

Finally, we need to make a route for handling Giphy requests. Beneath the
`test` route (but above the export), type this code:

```javascript
router.get('/giphy/:fmt/:search', (req, res) => {
  console.log(`Giphy search for term ${req.params.search}`);
  
  giphy.random({
    tag: req.params.search,
    rating: 'g',
    fmt: req.params.fmt
  }, (err, result) => {
    if(err) {
      res.status(err.status || 500);
      res.render('error', {
        errorMessage: err.message,
        error: err
      });
    }

    res.send(result);
  });
});
```

This is, obviously, a more complicated route. In this case, we use route
parameters, to parameterize the route. This route is thus built to handle
`GET` requests pointed at `/giphy/<fmt>/<search>` (Express and many frameworks
use `:variable` to define route parameters). This means we can put anything in
the place of `:fmt` and `:search` and this route will still be used. We can then
access what was put in those parameters by using the `req` object. Here, when
we call the `giphy.random` function exposed by `giphy-api`, we pass it
`req.params.search` as the tag (since that's what was put in `:search`) and
`req.params.fmt` for the requested format of the result. Then, when the
asynchronous call to Giphy is complete, we `res.send` the `result`. If there
was an error, we `res.render` the error page.

That's the complete server code. Try running the server and navigating to
`localhost:3000/test` or, if you're feeling adventurous, go to
`localhost:3000/html/nodejs`. The `html` part will tell Giphy we want an `html`
response, and you can replace `nodejs` with whatever Giphy search term you
want.

I think that's pretty cool.

Now let's head back into our client and set up a `/giphy` command.


#### Final notes on Express

This has been a very brief overview of Express. The Express framework is very
powerful, and can be used to compose very complicated applications. I've tried
to overview the most important bits, from middleware to templating to routing.
If you really want to keep building on these skills, you should find some
Express tutorials online. You should find that you now have a good foundation
to understand more complicated uses of the framework.

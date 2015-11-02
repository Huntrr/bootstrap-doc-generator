```javascript
var path = require('path'); 
var express = require('express'); 
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var routes = require('./routes'); // this refers to the routes.js file we will write soon
```

We start off by obtaining all of the required resources and packages for the application that we're going to use later on. We can do this in Node by using the `require('name of module')` syntax. `name of module` can either be the name of some module you specified or the path to a file that you've written yourself. Cookie-parser allows us to parse and use cookies with signatures. Cookie-session is a module which provides "guest" sessions, meaning any visitor will have a session, authenticated or not. If a session is new a Set-Cookie will be produced regardless of populating the session. We'll see more of both cookie modules - and their applications in our web app - a little later on.

Now that we've stated what we need, let's instantiate our app:

```javascript
var app = express();
```

Express is a minimal and flexible NodeJS web application framework that provides a robust set of features for web and mobile applications. This line both instantiates Express and assigns our variable `app` to it.

We should now tell the app where to find the views (HTML templates/files) it needs, what engines to render them with (we're going to use HJS, you can find more on the tempalte syntax it uses [here](http://mustache.github.io/mustache.5.html)) and which methods to use to get things up and running (just telling our app to use the logger and parsers we defined above, setting the secret that we use to encrypt cookies that store session information and telling the app where to look for public files like CSS, and frontend Javascript).

```javascript
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hjs'); 
app.set('port', process.env.PORT || 3000);

app.use(cookieParser()); 
app.use(session({secret: 'codeweekend'})); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes); // this a custom route handler, which we will write soon in routes.js
```

Note how the last line tells the app to treat the folder directory like the top-level. This just means that if we have a web page running on the server and we want to link a CSS file to it which has a filepath of `public/stylesheets/main.css`, we simply have to link to it as `stylesheets/main.css` and it's automatically found for us. This makes it pretty easy to locate files you need to render a webpage, doesn't it?

The second section above constitutes a set of functions known as middleware. Each of these functions are run *in order* whenever an incoming request is processed by the server. The first parameter to the `app.use` function is a *path* to run the middleware on (depending on which route/path the incoming request is made on) - and if left blank, as above, it runs the functions - specified in the second parameter - for *every* incoming request, regardless of path.

Notice the last middleware in this section is a custom route handler that we will write soon. This will handle specific types of requests on specific paths, for example, to '/' and '/home'. We only write handler functions for the routes we care about, and for the rest, we'll simply return one of the most famous errors on the Internet - 404 Not Found!

Google's server handles routes like '/mail' or '/search', but it almost certainly returns a 404 error to '/mail/lakdfmladkfmadlkfmadlkfmaldkfmadlkfmad'. Let's make sure that any routes we haven't *explicitly* defined return a 404 error as the server response:

```javascript
app.use(function(req, res, next) { 
var err = new Error('Not Found'); 
err.status = 404; 
next(err); 
}); 

app.use(function(err, req, res, next) { 
res.status(err.status || 500); 
res.render('error', { 
errorMessage: err.message, 
error: app.get('env') === 'development' ? err : {} 
}); 
});
```

This section of code serves as the last of the middleware in the app - if any requests find themselves here *without* being handled by our previous middleware handler function, they should return 404 errors.

The functions used by the application here accept `req` (request), `res` (response) and `next` (the next function in the middleware stack) parameters. In order to send a response from our server to any incoming requests, we use the `res` object that's passed into the function. In this case, we set the response status to the error status (404) and render an error page.

Just to really drill down on our route handler, let's look at the code again.

```javascript
var routes = require('./routes');
app.use('/', routes);
```

These lines initialize our routes. Routes are basically what tells our app what to do when the user goes to a certain url within our website. For example, going to google.com/mail corresponds to the '/mail' route as far as Google's backend is concerned. By requiring the `'./routes'` file, we're saying that we've stored our routes in a separate file, and the next line tells node to look there for all its routes. We'll take a look at the routes file soon.

And finally, to get the app really off the ground and make it actually work for someone trying to reach our website, let's make it listen for requests.

```javascript
app.listen(app.get('port'), function() { 
console.log('Express server listening on port ' + app.get('port')); 
});
```

We'll use the port and resources we defined earlier on.

Just to make things interesting, we can also add in some *more* middleware. This middleware will work with data stored in request cookies, and since we want this to run for every route before they're handled by our route handler, don't forget to put it *before* the middleware `app.use` call for the route handler!

```javascript
app.use(function(req, res, next) { 
if (req.session.message) { 
res.locals.message = req.session.message; 
req.session.message = null; 
}

if (!req.session.notes) { 
req.session.notes = []; 
}

next(); 
});
```

If we get session messages, we set them to our local state. This means we can access these messages later when we're handling routes. And if no session notes exist, let's make an empty collection (array) for them. We'll use this nifty code soon to create and store notes in the user's browser cookies. Each time a request comes into the server, it'll contain the same cookies (which will reflect any changes we make to them). Think of cookies as contextual data provided with each incoming request to the server that lets us provide contextual reponses!

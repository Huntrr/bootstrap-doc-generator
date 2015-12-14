The first thing we need to do is swap out our pure Socket.IO server for an
Express server. We'll then re-hook Socket.IO to utilize the Express server for
WebSockets.

To do that, delete this code

```javascript
/* This sets up a pure socket-io server.
 * Later in the guide we upgrade to a full
 * express server */
let Server = require('socket.io');
let io = Server(3000); //construct a server on port 3000
console.log('SocketIO listening on port 3000');
```

And replace it with the Express equivalent:

```javascript
// sets up express
let path = require('path');
let express = require('express');

let app = express();
app.use(express.static(path.join(__dirname, '../client')));

// TODO: 404 error

let server = app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

let io = require('socket.io')(server);
```

Most of this is boilerplate, so what it does isn't super important. Essentially,
we `require` in `path` (which helps parse file URIs) and `express` and then set
up a new `app` by calling the `express()` function.

Express apps tend to rely a lot on the `app.use` function in their
initialization. `.use` lets us pass a function to Express which it'll use as
"middleware." In simple terms, if you pass a function to `app.use`, it'll be
called every time Express gets a request. Here, we make sure our first
middleware (middleware is called in order) is the build in `express.static`
middleware. As its name implies, it's built for serving static files. Here, we
tell it to serve statically the files in `../client` which, clearly, is where
all our client files are.

Usually you'd have a `public` folder sitting next to your `server.js`, but we
don't need to re-structure the project now just for that.

Finally, we create a `server` that's simply the Express `app` listening on port
3000, and then we pass that `server` to Socket.IO, initializing `io` to be
a Socket.IO instance that runs on the Express server, rather than by itself.

If we run this code, we should find that everything still works, but now,
instead of having to open the `index.html` file manually, we can simply direct
a web browser to `localhost:3000`.

That, in essence, is Express.

But Express can also do a lot more.

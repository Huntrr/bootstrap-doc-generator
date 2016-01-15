Let's link some more Javascript to our `client/index.html`. First, at the bottom
of the `<body>`, where we currently link to the `jquery-client.js`, add these
lines:

```html
<script src="https://cdn.socket.io/socket.io-1.3.7.js"></script>
<script src="http://underscorejs.org/underscore-min.js"></script>
<script src="js/socket-client.js"></script>
```

This markup will link 2 external libraries (Socket.io and Underscore) as well as
a new local script, `js/socket-client.js`, where we'll handle all of our code
for handling the connection to the server.

Create `client/js/socket-client.js` now, and populate it with this code:

```javascript
'use strict';
var socket = io('http://localhost:3000');

socket.emit('PING');

// ---------------------
//    SOCKET HANDLERS
// ---------------------
socket.on('PONG', function (data) {
  console.log('Got PONG!');
});
```

What's it do? `var socket = io('http://localhost:3000');` uses Socket.io to
connect to a server running on `localhost` (the current computer) on port 3000.
That connects to our Node server. `socket.emit('PING');` sends the `PING`
message, and, as before, `socket.on('PONG', function (data) { /* ... */ }`
handles messages of type `PONG` coming from the server. Super simple, right?!

Let's trying running it.

First, open terminal, and `cd` to `server`. Then run `node server.js`. That'll
start the server.

Now, re-open `client/index.html` in your web browser. If you open up the
developer console (right click -> inspect element), you should see "PONG" in the
console. Try typing `socket.emit('PING')` into the console, you should see
"PONG" again. Congratulations! You have a working Node application!

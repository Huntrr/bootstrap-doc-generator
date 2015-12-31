Let's start with a super simple server set up.

Head into the `server` folder and create a `server.js` file. This will contain
the bulk of our Node code. To start, enter in this code:

```javascript
'use strict'; // puts us in strict mode (js in hard mode)

/* This sets up a pure socket-io server.
 * Later in the guide we upgrade to a full
 * express server, to serve files as well
 * as handle websockets */
let Server = require('socket.io');
let io = Server(3000); //construct a server on port 3000
console.log('SocketIO listening on port 3000');


// SOCKET HANDLER FUNCTIONS
io.on('connection', (socket) => {
  // on 'connection' we need to set some stuff up
  console.log('Got a new connection');

  // -----------------
  //  SOCKET HANDLERS
  // -----------------
  /**
   * Handles PING
   * Responds with a PONG
   */
  socket.on('PING', (data) => {
    console.log('Got a PING');

    socket.emit('PONG'); // reply with a PONG
  });
});
```

That's it! A fully functioning Socket.io server, just like that. Let's break
down the code into its component parts.

```
'use strict';
```

This line isn't super important. It just signals to Node that we want to use
Javascript in 'strict mode'. For most of what we're doing, the differences
between regular js and strict mode js are irrelevant, but it's generally
considered good practice to code in strict mode, as it causes Node to throw
errors more easily and often helps keep code cleaner, more clear, and more
'strict'.

```javascript
let Server = require('socket.io');
let io = Server(3000);
```

A few things of important here. First, `let`. You haven't seen this before, but
you'll see it a lot in the server side code. Recently, Javascript underwent
a big revision, called ES6 (or ES2015, depending on who you ask). One such
change is the addition of the `let` and `const` keyword. In ES5 Javascript, the
only way to initialize a variable was using the `var` keyword. The `var` keyword
worked, but was generally regarded as very clumsy when it came to [lexical
scoping](http://stackoverflow.com/questions/1047454/what-is-lexical-scope).
Essentially, programmers were upset with how `var` sometimes behaved ambiguously
compared to what they'd expect in other modern languages. The `let` keyword is,
in many ways, identical to `var` (so in this line we're creating a `Server` and
`io` variables, as if we replaced `let` with `var`) but many developers suggest
using it over `var` whenever you work in ES6, so that you never run into any of
the strange quirks inherent in `var`s behavior. `const` is a similar keyword,
except that, as you might expect, it creates an immutable identifier. If you've
taken CIS120, you're familiar with the power of immutability, so you know why it
might be helpful to use `const`s. 

Regardless of the intricacies, the use of `let` here is mostly just to help
familiarize you with ES6, since more and more Javascript will get the ES6
treatment in times to come. It's not super important to know the differences,
but I'll generally try to prefer ES6 idioms to ES5 code whenever possible in
this `server.js`. Unfortunately, ES6 isn't fully adopted yet to many major web
browsers, so our client code will stay ES5 compliant. I'll try to note the
differences whenever possible, but don't worry about getting too caught up in it
all. If you get confused, feel free to ask for help. At least some of your
mentors love talking about ES6, and so they'd be glad to explain what's going
on.

Next, the Node `require` function. You'll see a more explicit use of this
function later, when we implement users, but, for now, just note that `require`
is analogous to `import` in many languages. The `require` function will try to
pull in an external module (either another file in your project or, in this
case, a separate dependency) for use by the current module. In this case, we use
`require` to pull in the Socket.io library from our `node_modules` directory. We
label that import `Server`. In this case, socket.io exposes itself as
a function, so `Server` is now assigned to a function. In Socket.io, if the main
function is passed a port number, it will return a running server, and so that's
what we do with the second line. We set `io` to a server running on port `3000`.

Finally, the socket code:

```javascript
io.on('connection', (socket) => {
  // on 'connection' we need to set some stuff up
  console.log('Got a new connection');

  socket.on('PING', (data) => {
    console.log('Got a PING');

    socket.emit('PONG'); // reply with a PONG
  });
});
```

What's this do? The `.on` function is one of the key components to Socket.io. In
general, it takes the form of `.on(message:String, callback:Function)`.
Essentially, this function defines a rule for handling a socket message. When
the `message:String` is received, it tells Socket.io, the `callback:Function`
should be executed. You'll notice functions in Javascript are first-class, we
can pass them as parameters to other functions, just like variables. You'll also
notice we're using the ES6 arrow notation here for our functions. In this case,
`(socket) => { /* code */ }` is very similar to `function (socket) { /* code */
}` except it behaves a bit differently wit the `this` keyword and tends to look
better for inline anonymous functions.

Here we tell `io` (the socket server, remember?) to handle new `connection`
messages with this anonymous function that takes the socket (client) as
a parameter. The body of this function is the bulk of our Node app. It contains
all the rules for handling individual `socket`s, as you'll see soon.

Right now, the only `socket` message we handle is `PING`. We do this by using
`socket.on('PING', (data) => { /* ... */ }`. You'll notice this anonymous
function has `socket.emit('PONG');`. Essentially, what this does is tell
Socket.io that, every time a socket sends a `PING` message, it should respond,
emitting a `PONG` response back to the sending socket. By running `socket.emit`
we restrict the response to just the socket of interest. If we'd run `io.emit`
instead, we would send the message to the entire server.

That's our basic server. Now let's implement the basic client code, and then we
can come back here and do some more complicated things.

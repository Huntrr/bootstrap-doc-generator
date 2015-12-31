So now the `client` and `server` both have a `users` dictionary, but we still
need to create a user object to populate those dictionary. What better way to do
that than with a Node module! This section of the workshop should help
familiarize you with how Node handles external files. If you ever want to create
bigger projects in Node, this information is a must, as trying to put thousands
of lines of code into a single file is nothing but a recipe for disaster.

Enter the module pattern. Node's answer for compartmentalizing code.

The way it works is super simple. Every file in Node gets access to
a `module.exports` object. Whenever `require` is called on a file, this
`module.exports` object is what's returned. Consider a simple example. Say we
make a file called `HelloWorld.js` in our `server` directory, and wrote this
code:

```javascript
module.exports = () => { console.log('Hello World!'); }
```

Now, if we were to call `require('./HelloWorld');` from our `Server.js`, it
would return a function that, when executed, would log 'Hello World!' to the
console. Some sample code might look like:

```javascript
let funkyFunction = require('./HelloWorld');
funkyFunction(); // prints Hello World!
```

Got it? Good. Now let's create an actual module. In the `server` directory, make
a `user.js` file.

This module's goal is the export a User object that we can use to represent
users in the server model. There are many different object patterns in
Javascript, and we could spend hours just discussing the differences between
them. Although ES6 exposes a `class` syntax that Java developers would be
familiar with, some devs [really don't like
it](https://medium.com/javascript-scene/how-to-fix-the-es6-class-keyword-2d42bb3f4caf#.u2m9b66to),
so we're going to use something a bit different. Let's enter this code into
`user.js`.

```javascript
'use strict'

module.exports = function(socket, name) {
  /**
   * User object factory
   */
  let self = {
    setName(newName) {
      name = newName;
    },
    
    getName() {
      return name;
    },

    getId() {
      return socket.id;
    },

    getSocket() {
      // this is bad code
      // it's not properly encapsulated
      // sorry
      return socket;
    },

    toString() {
      return name + ' (id ' + self.getId() + ')';
    },

    toObj() {
      return {
        name: self.getName(),
        id: self.getId(),
        string: self.toString()
      }
    }
  };

  return self;
}
```

Again drawing on CIS120, this pattern will remind some of you of the object
pattern used in the OCaml Paint Project. Essentially, we're exported a **factory
function** that returns an object literal with a bunch of relevant functions
stored inside. `socket` and `name` get glued to the closure that's created, and
the result is a User object factory. If none of that made sense, don't worry.
Basically, we're exporting a function that takes a `socket` and a `name` as
a parameter and returns a `User` object. Now let's head back to `server.js` and
finish this implementation.

First, beneath our imports (where we `require` Moniker and Underscore), add this
line:

```javascript
let User = require('./user');
```

Now, we're able to use `User(socket:Socket, name:String)` to create a new user
as needed. Neat!

We're almost ready to start implementing the socket handlers. First, let's
revise our `io.on('connection', ...` function. I'm going to get rid of the
`PING` handler, but you can leave it in if you like.

```javascript
// SOCKET HANDLER FUNCTIONS
io.on('connection', (socket) => { 
  // on 'connection' we need to set some stuff up
  let name = getUniqueName(); // get a unique name
  let user = User(socket, name); // create a User (showcases the factory)
  users[socket.id] = user; // adds user to dictionary
  console.log(`:CONNECTION - ${user.toString()})`);

  // emit the current state to the new user
  socket.emit('STATE', {
    users: _.mapObject(users, (user) => user.toObj()), //_ for functional js
    user: user.getId()
  });

  // emit the new JOIN for all the other users
  socket.broadcast.emit('JOINED', {user: users[socket.id].toObj()});

  // -----------------
  //  TODO: SOCKET HANDLERS
  // -----------------


  /** Handles diconnect */
  socket.on('disconnect', () => {
    let user = users[socket.id];
    console.log(`:LEFT - ${user.toString()})`);
    socket.broadcast.emit('LEFT', {user: user.toObj()});
    delete users[socket.id];
  });
});
```

Alright, that leaves us with a fair amount to tease through before we move on.
What does this code do?

The first block adds our new user to the `users` dictionary.

```javascript
let name = getUniqueName();
let user = User(socket, name);
users[socket.id] = user
```

These three lines (1) get a random name using our helper from the previous
section, (2) create a new user using that name and the User model we just
`require`d, and (3) adds that `user` to `users`, mapping it to the `id` of the
`socket`. Now, `users[ID]` (where `ID` is the `id` of this `socket`) will always
reference this user.

Next, we emit the current state of the server to the user, so that they can
update their own user list.

```javascript
socket.emit('STATE', {
  users: _.mapObject(users, (user) => user.toObj()), //_ for functional js
  user: user.getId()
});
```

This emits a `STATE` message to the socket (client), containing a JSON object
that has, (1) a `users` field containing all the users currently connected and
(2) a `user` field containing the `id` of this connection (so the socket knows
who it is in the `users` list). We use `_.mapObject` again here to translate
from the server-sided User model to something simpler -- methods and closures
don't transfer well over Socket.io, so we need to translate each user object
into something a bit simpler.

Next we broadcast the `JOINED` event to the entire server so everyone else can
know they have a new chatter

```javascript
socket.broadcast.emit('JOINED', {user: users[socket.id].toObj()});
```

Finally, we need to add a little additional handler for Socket.io's built int
`disconnect` event. When a user leaves, we must delete their entry in the
`users` dictionary to free up their name for someone else.

```javascript
socket.on('disconnect', () => {
  let user = users[socket.id];
  console.log(`:LEFT - ${user.toString()})`);
  socket.broadcast.emit('LEFT', {user: user.toObj()});
  delete users[socket.id];
});
```

This code broadcasts the `LEFT` event to everyone so they can update their own
user lists, and then `delete`s the user from the dictionary.

With that, we're ready for the remainder of our chat implementation!

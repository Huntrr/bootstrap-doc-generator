It's almost time to write the rest of our chat handlers. First, we need a few
more methods on the server side to help us in the implementation of our server
model. This step will focus on those foundational helper methods, the next step
will showcase creating a Node module (to represent each User) and then, once
that's all set up, we'll be ready to write our socket handler functions.

First, these helpers. Open up `server/server.js`.

At the top of the file, below `'use strict';` add this code:

```javascript
// gets imports
let Moniker = require('moniker');
let _ = require('underscore');

let users = {};
```

Here, we see more of the `require` syntax. This time, we're pulling in a couple
other libraries. Moniker will help us randomly generate user names (just to
illustrate how easy it is to use external packages) and Underscore will provide
some helpful functions for manipulating our data.

For those CIS120 and up, check out the [Underscore
docs](http://underscorejs.org/). You'll notice methods like `fold` and `map`.
You can think of Underscore as a kind of standard library for functional
programming in Javascript. It's super common to see in projects because it
provides the kinds of functional patterns that keep code clean and simple.

The final line, `let users = {};` initializes the `users` dictionary. Once we
set up our `User` module/data type, this variable will function as a dictionary
for our logged in users.

Next, at the bottom of the file, add this code

```javascript
// HELPER FUNCTIONS
/**
 * Sees if a name is unique
 * @param name The name to check
 * @return boolean true if the name is unique
 */
function isUniqueName(name) {
  let names = _.mapObject(users, (user) => user.getName().toLowerCase());
  return !_.contains(names, name.toLowerCase());
}

/**
 * Gets a unique name using Moniker (showcases basic npm modules)
 * @return String a unique name
 */
function getUniqueName() {
  let name = Moniker.choose();
  while(!isUniqueName(name)) {
    name = Moniker.choose();
  }

  return name;
}
```

These functions are clearly documented, so it's a good exercise to try to figure
them out just by careful reading. If you can't, don't worry too much. They're
mostly just showcasing usages of the `Moniker` and `Underscore` libraries that
we just `require`d. `isUniqueName` checks to see if a name is unique. It does
this in only 2 lines by utilizing some `Underscore` functions. First we apply
`_.mapObject` to the `users` dictionary. To those familiar, it should look at
lot like the `map` function in many other languages. Essentially, it iterates
through the `users` dictionary and, for each user, grabs the lower case version
of their name, putting all of the names into an array of `names`, before using
`_.contains` to check if any of those `names` equals the `name` passed to the
function.

Next `getUniqueName` uses `Moniker` to choose a new name. We see `Moniker`
exposes a `.choose()` function that just grabs a random name, and this function
grabs random names until a unique one is found.

If you're confused, grab a mentor now. Otherwise, we're going to move back into
`client/js/socket-client.js` and add some useful helper functions there as
well.

#### Back to `client/js/socket-client.js`

First, let's add some code below `var socket = io('http://localhost:3000');`:

```javascript
// stores user in channel. It's a dictionary with id as key
// User objects have these fields
//   - id     (user id)
//   - name   (user name)
//   - string (string representation)
var users = {};

// stores the client user id
// hence users[me] or users.me gives the client user
var me = socket.id;
```

As before, this sets up the `users` dictionary, this time on the client. As you
see, the dictionary will map user `id`s to user objects. For client reference,
we assign `var me` to the `socket.id`, so that we can simply use `user[me]` to
refer to the current user.

Now head to the bottom of `socket-client.js` and add this code:

```javascript
// ---------------
//     HELPERS
// ---------------

/**
 * Showcases functional Javascript (_.fold) and ternary operators
 * to get a list of the users currently chatting
 */
function getUserList() {
  return _.reduce(users,
                  function (rest, user) { 
                    return (rest ? rest + ', ' : '') + user.name;
                  },
                  ''
                 );
}

/**
 * Sends a MESG to the server
 */
function sendMessage(message) {
  socket.emit('MESG', {message: message});
}
```

As before, `getUserList` uses some familiar `Underscore`. The `_.reduce` method
is analogous to `fold` in many languages. Here, we `reduce` or `fold` on the
`user` dictionary to get a string of comma separated usernames.

In `sendMessage` we use Socket.io to emit a `MESG`. You can see here how we add
an extra parameter to the `socket.emit`. This lets us send a JSON object with
our message so the server has some data to handle. In this case, our JSON
object is very simple: containing only a `message` field.

You'll notice this code hasn't really done much so far. That's just because
we're simply laying the groundwork for the rest of the code. In the next step,
we'll create a User model, showing off Node's module pattern, and then we'll be
ready to add some actual chat functionality!

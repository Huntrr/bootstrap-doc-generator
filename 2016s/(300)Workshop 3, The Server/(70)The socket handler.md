Let's start by adding the `MESG` handler to the `server.js` file.

```javascript
// ---------------
// SOCKET HANDLERS
// ---------------
```

Add this code 

```javascript
  // -----------------
  //  SOCKET HANDLERS
  // -----------------
  /**
   * Handles MESG
   * When a client tries to speak
   * Data object contains:
   *   - message
   */
  socket.on('MESG', (data) => {
    let user = users[socket.id];
    console.log(`:MESG - <${user.getName()}> ${data.message}`);
    
    let message = {
      from: user.getName(),
      message: data.message
    };

    io.emit('MESG', message); // broadcast the message everywhere
  });
```

This handler handles `MESG` events. We already know from `socket-client.js` what
the `data` for these events should look like. There should be a single `message`
field containing the content of the message. Using that, we parse the message,
constructing a new object with two fields (one `from` for the name of the user
who is sending the message and a second `message` again containing the message
contents). Then, we `io.emit` a `MESG` containing that information back to the
entire server (remember `socket.emit` is localized to one client, `io.emit`
broadcasts to everyone), telling everyone the message.

And, with that, our server is done. (I mean, we'll add some more functionality
later, but this will finish putting it in a working state). If you have time,
review the `server.js` code. If something doesn't make sense, ask a mentor. When
you're all set, it's time to finish handling the events on the `client` side.
Then we'll almost be done with the basic app.

\* A small side-note, I use ES6 template strings in this code. Regular string
literals in Javascript can be composed with `'`s or `"`s. In ES6 (and hence in
Node), we get a new method of composing template strings using \`\`s. One
template string here looks like:

```
`:MESG - <${user.getName()}> ${data.message}`
```

The `${}`s tags in the string are parsed as regular Javascript, making template
strings a super convenient way to intersperse dynamic values in ES6 strings. In
this instance, I use `${user.getName()}` and `${data.message}` to grab these
values midstring, without needing to concatenate them as you typically would.

#### On the client

Open back up `client/js/socket-client.js`. Below `var me = socket.id`, you're
going to want to add this code:

```javascript
// ---------------------
//    SOCKET HANDLERS
// ---------------------

/**
 * Handles STATE events.
 * These are fired when the client first connects,
 * the data object contains:
 *   - users (list of user objects currently connected)
 *   - user  (the id of the current client)
 */
socket.on('STATE', function (data) {
  users = data.users;
  me = data.user;
  console.log(':STATE - Users in channel: ' + getUserList());

  postMessage(infoColor, 'Hello! You name is ' + users[me].name + '. Currently,'
              + ' these people are chatting: <br>' + getUserList());
});

/**
 * Handles JOINED events.
 * When a new user joins.
 * Data object contains:
 *   - user (the user that just joined)
 */
socket.on('JOINED', function (data) {
  var user = data.user;
  users[user.id] = user;
  console.log(':JOINED - ' + user.string);

  postMessage(infoColor, user.name + ' just joined the channel!');
});

/**
 * Handles LEFT events.
 * Deletes users who leave.
 * Data object:
 *   - user (the user that left)
 */
socket.on('LEFT', function (data) {
  var user = data.user;
  console.log(':LEFT - ' + user.string);
  delete users[user.id];

  postMessage(infoColor, user.name + ' just left :(');
});

/**
 * Handles MESG events.
 * For messages to the client.
 * Data object:
 *   - from    (the NAME of the user the message is from)
 *   - message (the message)
 */
socket.on('MESG', function (data) {
  console.log(':MSG - <' + data.from + '> ' + data.message);

  postMessage(messageColor, formatMessage(data.from, data.message));
});
```

By this point, the code in these events should look familiar. Read the commented
documentation and try to reason through how they work.

You'll note we use the `postMessage` function from `client/js/jquery-client.js`
often as a means of posting text to the message box `<ul>`. Otherwise, some of
these events appear very similar to their server sides counterparts. `JOINED`
events should look very familiar to the basic `connection` events from before;
we add the user to our `users` dictionary and alert the user that someone new
has joined the channel. Likewise `LEFT` looks very similar to `disconnect`,
going so far as to use almost identical `delete users[user.id]` syntax to
cleanse the user from our `users` dictionary.

Indeed, the only truly new event here is the `STATE` handler, which, if you
remember from `server.js` is called when the client first connects to the
server. `STATE` is passed a data object containing a specially formatted list of
users, which we then print out to tell us who is currently in the channel.

And that's it! An entire chat app (almost). If you run the server now (`node
server.js` in terminal from the `server` directory) and open `index.html` in
multiple tabs/windows, you should be able to play with the basic functionality.

Right click on the page, click `inspect element` and send messages by using the
browser console: Try entering `sendMessage('Hello World!')`! If everything
worked, the message should end up on all connected windows.

Over course, requiring communication via the console does not make for a very
user friendly chat app. In the next (short) step, we'll dive back into
`jquery-client.js`, make some very small changes to hook our existing UI up to
this new functionality, and the result will be a fully functional chat client.

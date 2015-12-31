This is going to be super complicated. Ready?

Open `client/js/jquery-client.js`. Delete this line:

```javascript
postMessage('black', formatMessage('Me', $('#message').val()));
```

and replace it with this line:

```javascript
sendMessage($('#message').val()); // server messaging
```

And that's it. Now, instead of just printing to the message box, submitting
a new message uses our `sendMessage` functionality from `socket-client.js` to
send a message to the server. That's it! Cool, right?


#### Changing names

Of course, this chat server is kind of barebones. We'll use the rest of this
section and one more section afterwards to make it a bit cooler. First we'll add
functionality to change your name (because `Moniker` names are only so cool) and
then we'll hook up to the Giphy API to let people post images and GIFs to the
chat room. Ready? Let's go.

First, names. Now that you know how the server and client can communicate and
send messages, you should try to figure how we might use this protocol to change
a user's name.

The answer, of course, is another message handler. Now, we'll create a `NAME`
message that can be sent back and forth between the server and client to update
a user's name. We should probably model it like this:

1. User 1 sends a `NAME` message to the server, requesting a particular name

2. The server validates the `data` of the `NAME` message, makes sure its
   a unique name, and, if it is, broadcasts a `NAME` message to the whole server
   to reflect the change.

3. All users receive a `NAME` message informing them of the update, and they
   change their `users` dictionaries accordingly.

We'll probably also want some kind of `ERROR` message the server can throw if
the name is invalid, but we'll get there later.


First, let's open up `server/server.js` and create the handler for this `NAME`
message. It'll go below our handler for `MESG`, above the handler for
`disconnect`, and it should look something like this:

```javascript
  /**
   * Handles NAME
   * When a client tries to change their name
   * Data object contains:
   *   - newName
   */
  socket.on('NAME', (data) => {
    let user = users[socket.id];
    console.log(`:NAME - <${user.getName()}> wants to change name to`
                + ` <${data.newName}>`);

    if(isUniqueName(data.newName)) {
      // success!
      console.log(
        `:NAME - <${user.getName()}> changed name to <${data.newName}>`);
      user.setName(data.newName);
      io.emit('NAME', {user: user.toObj()});
    } else {
      // failure :(
      console.log(':ERROR - NON_UNIQUE_NAME');
      socket.emit('ERROR', {message: 'NON_UNIQUE_NAME'});
    }
  });
```

Try to parse this method yourself.

First we `let user` be the user from `users` that send the message. We then
check to see if the requested name `isUnique`. If it is, we update `user`'s name
on the server and then `io.emit` the new `user` object to the whole server.
We'll assume that, once we set it up, the `NAME` handler on the client knows how
to handle this data.

If the name isn't unique, we fail `:(` and `socket.emit` an `ERROR` message to
the client that tried to update its name.


Now, we'll open up `client/js/socket-client.js` and add the handlers to the
client. First, we'll add a handler for the `NAME` message below the `MESG`
handler. It should look something like this:

```javascript
/**
 * Handles NAME events.
 * Updates a users name.
 * Data object:
 *   - user (the updated user object)
 */
socket.on('NAME', function (data) {
  var user = data.user;
  var old = users[user.id];
  users[user.id] = user;
  
  console.log(':NAME - <' + old.string + '> changed to <' + user.name + '>');

  postMessage(infoColor,
              '&lt;' + old.name + '&gt; changed their name to &lt;' + user.name + '&gt;');
});
```

As you can see, the function parses the `user` object in the received `data`
object and uses it to update its client-sided dictionary of `users`. Then it
`postMessage`s an update to the message box so the user knows what's happened.
Nice and simple.

Next, we'll add a handler for `ERROR`s below this `NAME` handler. It'll look
very similar to our `MESG` handler, but it'll print an error in red.

```javascript
/**
 * Handles ERROR events.
 * Data object:
 *   - message
 */
socket.on('ERROR', function (data) {
  console.log(':ERROR - ' + data.message);

  postMessage(errorColor, 'ERROR: ' + data.message);
});
```

Nice and simple.

However, we still don't have a way to actually send the `NAME` change request
from the client. For that, we'll have to add **commands**.


#### Adding Commands

In this case, we'll keep commands entirely in `socket-client.js`. For this,
we'll start by updating the `sendMessage` helper to determine if a particular
message is a command.

```javascript
/**
 * Sends a MESG to the server
 */
function sendMessage(message) {
  // check if it's a command
  if(message.substring(0,1) != '/') {
    socket.emit('MESG', {message: message});
  } else {
    // it's a command!
    let params = message.substring(1).split(' ');
    let cmd = params[0];

    sendCommand(cmd, params);
  }
}
```

Here, we add an `if`/`else` block that checks if the first letter of a message
is `/`. This'll signify our command. If you want, you can change `/` to
something else, but I figured `/` is pretty standard for these things. If the
`message` is a command, it parses the parameters into an array using standard
Javascript and then called `sendCommand` on the result.

Obviously this isn't enough. We still need to write a `sendCommand` function
that actually handles these commands. Let's do that now.

```javascript
/**
 * Handles commands
 */
function sendCommand(cmd, params) {
  console.log('User attempted cmd ' + cmd);
  console.log('Params: ' + params);

  switch(cmd.toLowerCase()) {
    case 'setname':
      setName(params[1]);
      break;

    default:
      postMessage(errorColor, 'ERROR: Invalid command "' + cmd + '"');
  }

}
```

Obviously there's only one command at this point, so for now this function is
simple. We do a switch statement on the `cmd` and if it is `setname` we know the
user is trying to change their name. The last thing to do is to add a `setName`
function to the bottom of the file that'll catch the program when it executes
`setName(params[1]);`. That should look something like:

```javascript
/**
 * Sends a NAME message to the server
 * changing this users name
 */
function setName(newName) {
  socket.emit('NAME', {newName: newName});
}
```

See? All `setName` needs to do is `socket.emit` a `NAME` message with a data
object containing the `newName` field. Our methods on the server will handle the
rest.

If everything was done right, the commands should work now. Try opening up a few
instances of the chat client (don't forget to run the server) and use `/setname
<newname>` to edit your name. Does it work? What happens if you enter an
already-existing name? What happens if you type a valid command?

Next up: One more command. Let's allow users to upload images.

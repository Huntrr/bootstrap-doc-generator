Let's add a command to upload images from a URL.

Again, we'll start in `server/server.js`, adding a handler for a new `IMG`
message. Below the `NAME` handler, add this:

```javascript
/**
 * Sends an image (specified by a url) to
 * all clients
 * Data object contains:
 *   - url
 */
socket.on('IMG', (data) => {
  let user = users[socket.id];
  console.log(`:IMG - <${user.getName()}> IMAGE @ ${data.url}`);

  let message = {
    from: user.getName(),
    message: `<img src="${data.url}" class="message-image">`
  };

  io.emit('MESG', message);
});
```

As you can see, the `IMG` handler looks very similar to `MESG`'s handler. The
only difference is that, instead of the `message` content being text, it's HTML
for an image. Then, to keep things super simple, we just `io.emit` the `message`
as a `MESG`, which means the client already knows what to do when it receives
the message!

Finally, we open up `client/js/socket-client.js` to add support for this new
command. At the top of the switch statement for the `sendCommand` function, add
this block: 

```javascript
case 'image':
  sendImage(params[1]);
  break;
```

Next, let's write the `sendImage` function. Stick this at the bottom of the
file:

```javascript
/**
 * Serves an image
 */
function sendImage(imgUrl) {
  socket.emit('IMG', {url: imgUrl});
}
```

Like with `setName`, this command just `socket.emit`s the necessary information
to the server. That's it! Now run the server, open some clients, and try sending
some images! Note that the command takes the shape of `/image
http://example.com/image.png`.

Next up: Express, Giphy, and Databases!

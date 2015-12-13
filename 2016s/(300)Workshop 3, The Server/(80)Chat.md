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

We're almost ready to start writing our Node app. Before that, however, a quick
interjection to introduce [Socket.io](http://socket.io/).

Socket.io is a widely used Node module for handling [web
sockets](https://en.wikipedia.org/wiki/WebSocket). The WebSocket protocol is,
according to Wikipedia, a means of providing full-duplex communication over
a single TCP connection. For our purposes, it boils down into a set of rules
that allow web browsers to communicate in real time with web servers over HTTP.

Many web servers in the real world have the main task of getting HTTP requests
(the kinds your browser sends whenever you enter an address in your address bar)
and streaming responses in the form of webpages. Later, in workshop 4, we'll
use Express to serve the webpages in our `client` folder exactly like that. For
now, though, we can just open our `client/index.html` file in a browser.

In the end, the interesting part of our application is going to be how those
client files communicate with our Node app via these WebSockets.

Socket.io does some really cool work to abstract the WebSocket protocol. It
creates a common language that you'll see in the next few sections for handling
these real-time connections on both the client and server. The essence of the
communication is very simple. Using javascript, we can define (1) a set of rules
for responding to messages, likely creating different rules for differently
labeled messages, and (2) we can imperatively emit messages from the client
(called a socket in Socket.io terms) to the server or from the server to any
particular socket.

That means this section of the tutorial will focus on two different areas of
work. In the `server` folder, we're going to be building a `server.js` file that
we can run using Node. This'll act as our Socket.io server, handling connections
and streaming important information like chat messages. In the `client/js`
folder, we'll be building a new `.js` file, `socket-client.js`, which will
handle the client-sided communication with the server.

If you've taken CIS120, or have some similar experience, you might be able to
use this description to start envisioning how we might implement the model for
our chat server. If not, don't worry. Once we start coding everything should
become more clear.

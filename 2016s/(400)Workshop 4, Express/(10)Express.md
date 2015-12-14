[Express](http://expressjs.com/en/index.html) is a web framework for NodeJS.

Right now, our app is pretty cool. We have some static pages, and a neat Node
script that uses Socket.IO to handle back-and-forth chat messages with our
server.

But, in its current state, that isn't very useful. For example, if we just
opened up a web browser and navigated to our Node server, we wouldn't see
anything useful! Our server *functions*. It *knows* how to handle web sockets,
but it doesn't yet know how to handle basic HTTP requests. So the server doesn't
know how to handle arbitrary connections on the internet, which means it can't
serve our webpages to clients by itself.

That's where Express comes in. Node, on its own, has a pretty nice `http`
library for building `http` servers, but Express massively simplified the
project, which is why many large applications built with Node depend on Express
to handle their HTTP routing. For this chat server, we're going to use Express
to (1) serve our static pages (so, rather than clicking the `index.html` file we
can just navigate to `localhost:3000` in the web browser) and (2) handle
a simple route for Giphy integration.

Before we actually build the meat of the Express application, I'll try to give
a brief overview of what HTTP servers do. Realize this is oversimplified. It's
meant to give an overview of web servers in the context of Express and Node, and
if you're really interested in learning more, you should hit Google, Wikipedia,
Stackoverflow, and whatnot.

HTTP servers respond to various kinds of HTTP requests. The most common kind of
HTTP request you see on a daily basis are `GET` requests. Every time you open up
`Generic Web Browser`, type a web address and hit enter, you're sending an HTTP
`GET` request for some content online. Usually, the server will respond by
streaming you a `.html` or `.php` or image file. Some services (like what we'll
build today) can also respond to `GET` requests with `.json` files, or really
any kind of data whatsoever. Sometimes the server will tag the response as being
an error. You've probably seen this before in some capacity or another; the most
common error is, of course, error `404`.

That said, my favorite error is still error `418`.

![Error 418
@ Google.com](https://i1.wp.com/fat.gfycat.com/EquatorialAjarBlackfootedferret.gif)

(this is [actually a thing](http://www.google.com/teapot))

HTTP servers can also respond to other kinds of requests. Although I've never
seen a server respond to an HTTP `BREW` request (that's where Error `418`
usually occurs), other common request types include the `POST` for posting new
data to a database (like creating a status update on Facebook) or `PUT` for
putting an update to old data. There's even an HTTP `DELETE` request.

Together, these kinds of requests are referred to as HTTP Verbs, and Express
gives us a really nice interface for building different routes to handle these
various verbs. In this workshop, we'll show the construction of a simple `GET`
request handler, but you should be able to use that, along with this
information, as a jumping off point for more complicated web applications.

First off, let's set up our server to use Express.

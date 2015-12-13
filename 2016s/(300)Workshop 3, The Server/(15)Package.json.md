The first bit of the Node app is purely logisitcal. A `package.json` is
a standardized JSON file containing all the pertinent information about this
app. It's fairly readable and contains information about the authors, app
version, and versions of Node modules used.

For this bit, you'll want to hop into the `server` folder in your main project
directory, and create a `package.json`. Yours should look something like this

```json
{
  "name": "chat-server", // module name
  "private": true, // keeps this app private
  "version": "1.0.0",
  "description": "A chat server built for Code Weekend Spring 2016",
  "main": "server.js",
  "dependencies": {
    "express": "^4.13.3",
    "giphy-api": "^1.1.11",
    "moniker": "^0.1.2",
    "socket.io": "^1.3.7",
    "underscore": "^1.8.3"
  }
}
```

You'll notice a couple important things here. Chiefly, you'll see that list of
`dependencies`. That list specifies all the different external node modules
we'll be relying on in our app. We have 5 dependencies here, since we're going
to, when everything is all set and done, use 5 external packages.

When you're done making that file, open up a terminal window, navigate to the
`server` folder and type `npm install`. This'll read your `package.json` and
download all the necessary dependencies. You'll notice you now have a folder
called `node_modules`. That's where Node houses the code for all of these
dependencies.

Once that's all set we're ready to keep going.

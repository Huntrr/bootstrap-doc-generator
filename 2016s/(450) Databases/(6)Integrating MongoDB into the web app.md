We're now going to integrate a MongoDB database into our application to store data. As said earlier, Mongo is a document database (basically the entire thing is one JSON document) that provides high performance, high availability and easy scalability. The first thing we're going to have to do is add MongoDB to our dependencies list inside of ```package.json```.

> *TIP:* Think back to what the dependencies section of the ```package.json``` is for! Also, isn't it cool how all we need to do to include all the source code for handling MongoDB is by requiring a new module? This is one of the reasons why NodeJS is so popular!

Add "mongodb": "~1.4.19" to the dependencies object inside the JSON so that it looks a little like this.

```json
{
  "name": "chat-server",
  "private": true,
  "version": "1.0.0",
  "description": "A chat server built for Code Weekend Spring 2016",
  "main": "server.js",
  "dependencies": {
    "express": "^4.13.3",
    "giphy-api": "^1.1.11",
    "hjs": "0.0.6",
    "mongodb": "^1.4.10",
    "moniker": "^0.1.2",
    "socket.io": "^1.3.7",
    "underscore": "^1.8.3"
  }
}
```

Now let's go to `server.js`. Just like any other module, we first need to require `mongodb`. However, we will also have to point the program towards where all the information will be stored:

```javascript
let mongo = require('mongodb').MongoClient;
let uri = "mongodb://dinphil:dinph1l@ds054298.mongolab.com:54298/chatsrvr";
```

Next, let's add the following code to open a connection to the database. This code should be inside of the connection block. This is because it should be the first thing that is done on connection.

```javascript
mongo.connect(uri, function (err, db) {
  var collection = db.collection('chatmsgs')
  collection.find().sort({ date : -1 }).limit(10).toArray((err, array) => {
    if(err) return console.error(err);
    for(let i = array.length - 1; i >= 0; i--) {
      socket.emit('MESG', array[i]);
    }
  });
```

Step by step what this block of code does.

We connect to the database using the connection string we've defined. Notice that the function `connect` actually takes a callback rather than returning the database directly. This can useful in some cases, since it allows your app to do other things while waiting for the database to connect.

Within the connection, there are a few important things we note. First, we define a specific collection. A collection in a mongo database is like a file in any computer. In this case, we're going to name the file `chatmsgs`, and grab the information from there.

Next thing that we do is actually find the ten most recent messages. This is done through the `collection.find()`. The sorting for recency is done through the `sort` function. These messages are placed in an array, and we then sort through the messages, and then display these messages through the  `socket.emit()` function. The `MESG` within this function is the function that displays the information.

Now, let's really get our hands messy and actually start adding the messages to the database. Inside of your MESG block add the following:

```javascript
mongo.connect(uri, function (err, db) {
    let collection = db.collection('chatmsgs');
    collection.insert({
      date: new Date().getTime(),
      from: user.getName(),
      message: data.message}, function(err, o) {
          if (err) { console.warn(err.message); }
          else { console.log("chat message inserted into db: " + message); }
    });
});
```

This is in the MESG block in order to capture all of the messages that are sent. Another step by step guide here:

The database has to be connected to again. Once the connection is made again, we access the same exact collection as before. If we were to save to another collection, the database would not be able to pull the previous messages. In order for the information to be properly saved we need to provide a bit of information. First of all, we would need to know the time in order to pull the most recent messages. We will also need to know the user in order to know who the message came from. Of course, we will also need the message. All of this information is inserted with the `collection.insert`

Well, that wasn't so bad! 

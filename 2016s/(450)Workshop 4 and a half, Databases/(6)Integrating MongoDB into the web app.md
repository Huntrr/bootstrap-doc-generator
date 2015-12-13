We're now going to integrate a MongoDB database into our application to store data. As said earlier, Mongo is a document database (basically the entire thing is one JSON document) that provides high performance, high availability and easy scalability. The first thing we're going to have to do is add MongoDB to our dependencies list inside of ```package.json```.

> *TIP:* Think back to what the dependencies section of the ```package.json``` is for! Also, isn't it cool how all we need to do to include all the source code for handling MongoDB is by requiring a new module? This is one of the reasons why NodeJS is so popular!

Add "mongodb": "~1.4.19" to the dependencies object inside the JSON so that it looks a little like this.

```json
{
"name": "codeweekend",
"version": "0.0.0",
"private": true,
"dependencies": {
"body-parser": "~1.6.6",
"cookie-parser": "~1.3.3",
"cookie-session": "~1.0.2",
"express": "~4.8.6",
"hjs": "~0.0.6",
"mongodb": "~1.4.19",
"request": "^2.42.0"
}
}
```

Now let's go to `routes.js`. Just like any other module, we first need to require `mongodb`:

```javascript
var mongo = require('mongodb');
```

Next, let's add the following code to open a connection to the database:

```javascript
var db;
var MongoClient = mongo.MongoClient;
var uri = "mongodb://localhost:27017/codeweekend";

MongoClient.connect(uri, function(err, database) {
if (err) {
throw err;
}

db = database;
});
```

The first thing we need to do is declare a variable for the database to be stored in (we'll see why in a minute). We also store the MongoClient object in a helper variable.

Next, we store the connection string in a variable. The connection string looks complicated, so let's break it down into parts. The beginning of any connection string for MongoDB is always "mongodb://". Next, you put the server name, a colon, and then the port number to connect to. In our case, since we're running the database on the same computer as the Node app, we can just use "localhost". The port number, 27017, is just the default port that `mongod` listens on; we didn't specify a different port when we ran `mongod` before, so that's where ours is listening. Finally, the string ends with a slash and then the name of the database to connect to. You can pick whatever name you'd like for the database; it's just a way of identifying which one you want to connect to in the case that you have multiple databases on your server. This also demonstrates one of the really nice features of MongoDB; if you specify a database that doesn't already exist, then it will create it for you.

Finally, we connect to the database using the connection string we've defined. Notice that the function `connect` actually takes a callback rather than returning the database directly. This can useful in some cases, since it allows your app to do other things while waiting for the database to connect. In our case, though, we just want to be able to use the database outside the callback, which is why we declared the `db` variable earlier.

In practice, you'll want to handle your errors more gracefully—meaning your app should do something other than just crash! For the purposes of this demo, though, it's simpler just to throw the error you get when trying to connect to the database. If your app crashes when you try to run it after adding this section, make sure that you have `mongod` running in an open terminal, and try again.

We also need to make a helper variable for the function `ObjectID`:

```javascript
var ObjectID = mongo.ObjectID;
```

Now, let's really get our hands messy and change our existing code to make use of the powerful database we now have access to.

```javascript
router.get('/', function(req, res) {
return res.render('index', {
title: 'Codeweekend Notes',
notes: req.session.notes
});
});
```

We already know that this stores our notes in a session. However, now, let's make use of that database we've been talking about so much! With a little change in how we access and store the notes object, we can now route the entire process through our DB. We're going to make use of *queries* in the following sections, which are basically different ways of searching for data in a database. Naturally, each database allows you to create and use queries differently, and [this](http://www.tutorialspoint.com/mongodb/mongodb_query_document.htm) is how Mongo does some of the more popular ones.

First, assuming we've stored all of the notes into a collection called `notes` inside of the `codeweekend` database, let's render all of the notes in the database for the route '/'.

```javascript
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res) {
db.collection('notes').find().toArray(function(err, notes) {
return res.render('index', {
title: 'Codeweekend Notes',
notes: notes
});
});
});
```

The ```find``` query returns all the documents in the collection, and the ```toArray``` method parses them all into an array, so that they can be rendered as before onto the page. It's important to note that ```find``` only returns all of the documents in the collection because we have not specified any search parameters - effectively marking all documents as acceptable for return. Neat!

Next, let's return a specific document from the database, using the `_id` field in the document to identify it. Remember, this id is unique and only one document in the collection will match this query. See if you understand the code below.

```javascript
router.get('/:id', function(req, res) {
db.collection('notes').findOne({ _id: ObjectID(req.params.id) }, function(err, note) {
if (err || !note) {
req.session.message = 'That note does not exist!';
return res.redirect('/');
}

return.res.render('note', {
note: note
})
});
});
```

Before we do anything else, we'll briefly need to make a change in `index.hjs`. Before, we were using the `id` field for each note, but if you recall from before, MongoDB stores them in a field called `_id`. We'll need to change this in our links to be able to have them correctly send the user to the page for a given note. So let's change the section for the notes to the following:

```html
{{#notes}}
<li><a href='/{{ _id }}'>{{ title }}</a></li>
```

Now that we can retrieve data from the database, let's also add new data to it! Let's go back to `routes.js` and change the final route. Using the `insert` method, we can quickly and easily add a new JSON document to the `notes` collection:

```javascript
router.post('/create', function(req, res) {
if (!(req.body.title && req.body.body)) {
req.session.message = 'You must provide a title and a body!';
return res.redirect('/');
}

db.collection('notes').insert({
title: req.body.title,
body: req.body.body
}, function(err, result) {
req.session.message = 'Note created!';
return res.redirect('/');
});
});

module.exports = router;
```

Well, that wasn't so bad! In summary: every call to the database involves referencing our middleware `req.db` and using the collection (aka database) called 'notes'. We then use different functions like `findOne`, that finds one result, or `find().toArray` that gives us an array of all results in the databse. These functions also have callbacks that specify what to do in case there's an error, and if not, what to actually do with the result(s) we get. Who know switching storage stage could be that easy?

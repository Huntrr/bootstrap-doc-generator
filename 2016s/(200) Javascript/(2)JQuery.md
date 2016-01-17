Javascript is pretty cool on its own.

But it's cooler with external libraries.

One of the most popular third-party JS libraries is
[jQuery](https://jquery.com/). jQuery's a pretty full-featured set of tools,
but, at its core, it's an easy way of manipulating HTML on a page.

Let's look at how that works.

## First things first, let's import some code!

Before we can use JQuery, we're going to have to download JQuery and make sure
our program knows how to access it. Head to the JQuery website linked above and
head over to the download tab. Once there, you should find JQuery 2.x available
for download. If your computer doesn't download the file and displays text 
instead, don't worry and just copy and paste the contents of the file into a 
new text file that you call jquery.js. Go to the `client` directory of your
project, create a new directory named `js`, and place the file within it. This
is not a required directory, but this is just for the program to look nice. Now
you should have a file `client/js/jquery.js`.

Once we have done this, we have to let the program know where JQuery is located.
This is fairly easy, and can be done by adding something like
`<script src=""></script>` however, inside of the single quotes, instead we are
going to place the location of our file. JQuery is a tool, or a script, and what
the script tag does is it lets us know the location of these tools. In our case,
the full line should look something like: 
`<script src="js/jquery.js"></script>`.

## Now Lets Use It!!!

Recall HTML elements have various tags. Something like
`<h1 style="color: red;" id="first-big-line">Hello world!</h1>` makes use of
various HTML tags. Namely, it has an `id` and a `style` tag. In
Javascript, you can use some of these tags to "select" an HTML element. For 
instance, if you wanted to select this element, you could type
`document.getElementById("first-big-line")`. That's a bit of a mouthful, isn't
it?

jQuery makes it way easier. The above `<h1>` can be selected with jQuery by
simply typing `$('#first_big_line')`. The `#` refers to the fact that we're
selecting by `id` (just like how, in CSS, you reference an `id` with `#`)
There are some very neat functions built 
into jQuery as well. Say I wanted to get the text from my "first-big-line"
header. I can simply do the following.

```javascript
var header_text = $('#first-big-line').text();
console.log(header_text);
```
This will print the text inside the header to your Chrome console 
(Option + Command + J on Mac).


Now, how do we use jQuery in an actual project? Let's make a new file in our
`client/js/` directory. Call it `jquery-client.js`.

In `client/index.html` we'll need to link this new Javascript file. At the
bottom of the body, below where you linked `jquery.js`, we'll link another
script. It's as easy as:

```html
<script src="js/jquery.js"></script>
<script src="js/jquery-client.js"></script>
```

Now, open up `client/js/jquery-client.js`. It's time to code.

![YOLO swag](http://media3.giphy.com/media/62PP2yEIAZF6g/giphy.gif)

Okay so now that we have basic setup of all your files. Let's break down what
you need to do when processing a message. Recall that our messages will be stored
in a JSON object with just the text itself. No sort of styling. We need to create
chat boxes for every message that comes in. jQuery has a neat function `appendTo()`
that takes html as its one argument. It is formatted in the following manner:
```javascript
$('selector').appendTo('<SOME HTML TAG HERE>blah</SOME HTML TAG HERE>');
```

Like the name suggests, it *appends* html code to the element you have selected.
In the main part of our website that contains the messages, we can *append*
formatted messages. 

Also another neat thing, is that you can assign variables to functions
(think of it as naming a function for use later). Let's do that now.
```javascript
var infoColor = '#888888';
var errorColor = 'red';
var messageColor = '#000000';
var nameColor = 'blue';

var formatMessage = function(user, message) {
  return '<span style="color: ' + nameColor + '">' + user + '</span>' +
    ': ' + message;
};
```
Let's break this piece of code down. We are assigning a variable to a function
that has two parameters: the sender username, and the set `nameColor` color. 
This will go ahead and put a username before every message. 
We can go ahead and call this with simply by doing `formatMessage(param1,param2)`
where `param1` corresponds to the `user` and `param2` corresponds to `message`.
Pretty Dank amirite? Let's move on to the next piece of code. 

```javascript
var postMessage = function (color, contents) {
  console.log('Error: jQuery not ready yet');
};

$(function() {
  postMessage = function(color, contents) {
    $('<li><span style="color: ' + color + '">' 
        + contents + '</span></li>').hide().appendTo('#messages').fadeIn(200);
  };

  $('#message-form').submit(function (event) {
    event.preventDefault();

    //client side messaging only
    postMessage('black', formatMessage('Me', $('#message').val()));
    $('#message').val('');
  });
});
```

Wait, you might be thinking, what the heck is `$(function() { ...`? That looks
so confusing! You're right. It is confusing. Sorry.

One downside to jQuery is the need to initialize the library before we can use
it. To handle that, jQuery exposes a `$()` method that is passed a function as
the parameter. A function as a parameter? That's preposterous!

Nah, it's not. It's Javascript. You'd learn this more fully in CIS120, but the
general gist is pretty simple: Functions in Javascript are treated just like
variables. So, the `$(function param)` function takes a function as a parameter
and then,
when jQuery is initialized, calls that function. Take, as an example, the code

```javascript
$(function () {
    alert("HELLO WORLD");
});
```

All that's doing is saying "Hey jQuery! When you're ready, call this function
that does `alert("Hello world");`. The code above is just a more complicated
version of that. It says, jQuery, when you're ready, do this:


```javascript
// ... continued from above
  postMessage = function(color, contents) {
    $('<li><span style="color: ' + color + '">' 
    + contents + '</span></li>').hide().appendTo('#messages').fadeIn(200);
  };

  $('#message-form').submit(function (event) {
    event.preventDefault();

    //client side messaging only
    postMessage('black', formatMessage('Me', $('#message').val()));
    $('#message').val('');
  });
// ... and so on
```

What's going on here? Well, a couple things.

First, we define that pesky `postMessage` function. This function uses jQuery
to append a new message (defined by `color` and message `contents`) to the
screen. Look at the line

```javascript
$('<li><span style="color: ' + color + '">' 
    + contents + '</span></li>').hide().appendTo('#messages').fadeIn(200);
```

Let's expand that out and see what's happening:

```javascript
$('<li><span style="color: ' + color + '">' + contents + '</span></li>')
    .hide() 
    .appendTo('#messages')
    .fadeIn(200);
```

We "select" a virtual element (it doesn't exist yet), hide it, append it to
the `#messages` element, and then animate its fade in. That's some pretty
intermediate jQuery right there. We first "hide" the text (make its visibility 0,
but add it to the page), then append it to the messages, and finally go ahead and
fade in the message from transparent to visibile in 200 milliseconds (note most
Javascript timestamps are in milliseconds).

Next, we define an `event` for when the message form is submitted:

```javascript
$('#message-form').submit(function (event) {
    event.preventDefault();

    //client side messaging only
    postMessage('black', formatMessage('Me', $('#message').val()));
    $('#message').val('');
});
```

This snippet does a few things. `event.preventDefault()` cancels the default
web browser form-submit behavior. Then, we use that `postMessage` function to
post a message the screen. Finally, we do `$('#message').val('');` to reset the
contents of the form (overwriting the `val` of the text field to an empty string
`''`).

And that's that.

Open up the page again. Try typing. Click send message. If everything worked,
you should see jQuery working to push your messages to the screen.

If that's not happening, blame Devesh.

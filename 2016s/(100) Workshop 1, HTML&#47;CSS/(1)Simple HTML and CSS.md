HTML (HyperText Markup Language) is the backbone of any webpage. It's where we add in all the information - what the webpage actually displays, as well as information about the page itself such as its title.

![With and without CSS](http://static.webplatform.org/w/public/6/6e/article4.gif)

CSS (Cascading Style Sheets) dresses up this information. Most (but really all) webpages link to a CSS file that stores information on how a browser should display the information it recieves in the HTML. While it is possible to add CSS code into the HTML document, it is never done as it makes it nearly impossible to keep track of code and also slows down the page.

Javascript is the fun part. It does dynamic things with your webpage, updates content on the fly and can animate just about anything. We'll talk about this later.

In short, we can visualize it as follows: a full website is a program with raw structure defined via HTML, dressed up with CSS and controlled/manipulated with JavaScript.

Every webpage is built in the HTML DOM (Document Object Model). This means that every element in the HTML is an element (or a Node, the mathematical kind - not to be confused with Node.JS). So we could call this paragraph an element in the DOM; the same is true of any of the images and pretty much everything else here.

Let's start with HTML (HyperText Markup Language).

![HTML meme](http://38.media.tumblr.com/tumblr_m4fl5qPjdU1rw659vo1_400.png)

HyperText is text that will hyperlink you to other text. That's it. Think [links](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

It is called a Markup Language because HTML is not written as plain text. It is marked up into the form of HTML elements called 'tags.' Tags are denoted by `<` followed by `>`. Below is the most basic HTML document we can create (except for the comments that we've added in to make things clearer).

```html
<!-- This, is a comment that does not affect any of the code we write. We can use this to leave notes in the code for our future selves, or for others reading our code. This is also the most basic HTML document you can create. -->
<!DOCTYPE html>
<html>
  <head>
    <title>Code Weekend Sample Page</title>
  </head>
    <body>
    <p>This is a basic HTML webpage.</p>
  </body>
</html>
```

`<!DOCTYPE html> <html>` is how you should start any HTML file. For every HTML tag that we open, there must be one that closes it. This way we can easily tell what information is contatined in what tag, and it allows for easy nesting. The obvious drawback is that this is highly verbose. For example, `<html>` must eventually be closed by `</html>`.

Aside from the content rendered into the *body* of a webpage, we often define more information about the site in the `<head>` tag like this:

```html
<head>
  <meta charset="utf-8">
  <meta name="description" content="Code Weekend Sample Page">
  <title>Code Weekend Sample Page</title>
  <link rel="stylesheet" href="main.css">
</head>
```

So now we've specified the character set that the page uses - this is just to make sure the browser doesn't think that the page is in a language other than english. Then there's a description followed by the actual page title (this is what you see in the title bar of your browser). Finally there's a tag where we've linked this HTML file to a CSS document (the `href` component is how we tell the browser where to look for this file - it can be a path or a web address). This is how we add external CSS files to a webpage - which we'll do soon enough, don't worry!

Now let's get to the fun part - the `<body>` tag. This is where all the actual stuff that shows up on your webpage goes. Let's try adding some information in.

```html
<body>
  <h1>Code Weekend Sample Page</h1>
  <h2>Here's a smaller heading. We can go all the way down to H6</h2>
  <!-- Here's a comment that will not show up on the actual page -->
  <p>
    Here's a paragraph of text. You can fill in whatever you feel like in here and just end this tag to fininsh the paragraph.
  </p>
</body>
```

Let's look at this whole document now.

```html
<!-- This, is a comment that does not affect any of the code we write. We can use this to leave notes in the code for our future selves, or for others reading our code. This is a slightly more compelte HTML document, but still doesn't have any information about styles. -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Code Weekend Sample Page">
    <title>Code Weekend Sample Page</title>
    <link rel="stylesheet" href="main.css">
  </head>
  <body>
    <h1>Code Weekend Sample Page</h1>
    <h2>Here's a smaller heading. We can go all the way down to H6</h2>
    <!-- Here's a comment that will not show up on the actual page -->
    <p>
      Here's a paragraph of text. You can fill in whatever you feel like in here and just end this tag to fininsh the paragraph.
    </p>
  </body>
</html>
```

Here are some more important HTML tags:

- `<a href="link here">text for the link</a>` - used to create links
- `<img src="path/link to image" alt="text to show if image doesn't load" />` - used to add images
- `<em>text here</em>` - used for italicising text
- `<strong>text here</strong>` - used to bold text
- `<ul>` and `<ol>` - used to start Unordered and Ordered Lists
+ `<li>Item here</li>` - used to denote each item in a list
- `<script> Code in here </script>` - used to add non-HTML code such as Javascript to a page. We can (and should) instead add an `src` attribute to the `<script>` tag and link to an external Javascript file to keep our ccode clean and maintainable.
- `<div>` - used to denote different divisions within your HTML body. Possibly one of the most useful tags when it comes to layout and styling in CSS.
- `<textarea>` - used to display text and/or allow the user to type text.
- `<button>` - used to add buttons to a given page.

Now let's add a little more functionality to our chat app. First, we'll add a way for the users to enter messages and then we'll allow them to submit those messages to the server.

```html
<!-- This, is a comment that does not affect any of the code we write. We can use this to leave notes in the code for our future selves, or for others reading our code. This is a slightly more compelte HTML document, but still doesn't have any information about styles. -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Code Weekend Sample Page">
    <title>Code Weekend Sample Page</title>
    <link rel="stylesheet" href="main.css">
  </head>
  <body>
    <h1>Code Weekend Sample Page</h1>
    <h2>Here's a smaller heading. We can go all the way down to H6</h2>
    <!-- Here's a comment that will not show up on the actual page -->
    <p>
      Here's a paragraph of text. You can fill in whatever you feel like in here and just end this tag to fininsh the paragraph.
    </p>
    <p>
        Let's continue building our chat app. We'll first add a textarea element to input text, and apply some CSS properties to make it look pretty!
    </p>
    <form>
    <textarea placeholder="Write your message here..." required></textarea>
    <button type="submit">Send Message</button>
    </form>
    <h3> Messages </h3>
    <p>
        Here's a list of all the messages so far:
    </p>
      <ul>
      </ul>
  </body>
</html>
```

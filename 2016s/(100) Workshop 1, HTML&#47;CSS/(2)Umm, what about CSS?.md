Almost there! Before we can decide how elements on the page should look, we actually need a way to find and identify these elements. That HTML document we said was almost complete, well, it was almost complete. The last thing we need to add in are identifiers as *tag attributes*, and these fall into two categories:

- IDs: These are unique to an individual HTML element. Once I give an ID to an element, it cannot be used again. Think Penn IDs. Every element can be assigned an ID. For example: `<p id="workshop-introduction">`.
- Classes: These are reusable names that we give to ranges of elements. This allows us to do thigns like apply the same style (say, a font) to multiple elements that have the same class, rather than writing the same thing over and over. For example, we can create multiple paragraphs with the same class: `<p class="red-text"> This text is theoretically red.</p> <p class="red-text"> This text is also presumably red. </p>`.

Now we have a way to decide on styles. Let's look at that HTML document again:

```html
<!-- This is a slightly more complete HTML document, but with no styles as yet. -->
<!-- This, by the way, is a comment that does not affect any of the code we write.
 We can use this to leave notes in the code for our future selves,
 or for others reading our code -->
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Code Weekend Sample Page">
        <title>Code Weekend Sample Page</title>
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <h1>Code Weekend Sample Page</h1>
        <h2>Here's a smaller heading. We can go all the way down to H6</h2>
        <!-- Here's a comment that will not show up on the actual page -->
        <p class="red-text" id="intro-para">
            Here's a paragraph of text. You can fill in whatever you feel like in here and just end this tag to finish the paragraph.
        </p>
        <p>
        Let's continue building our chat app. We'll first add a textarea element to input text, and apply some CSS properties to make it look pretty!
        </p>
    <ul id="messages"></ul>
    <form id="message-form" action="#">
    <textarea id="message" placeholder="Write your message here..." required></textarea>
    <button type="submit">Send Message</button>
    </form>
    <h3> Messages </h3>
    <p>
        Here's a list of all the messages so far:
    </p>
      <ul class="messages">
      </ul>
  </body>
</html>
```

We can also just change the style for an entire kind of element. So we could just change how all the `p` or `<h1>` tags look.

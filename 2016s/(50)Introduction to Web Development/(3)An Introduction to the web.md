There's pretty much three things happening every time you open a website:

- Your browser looks up an address (say google.com) and follows it back to its home - the server which actually runs the website. This server is basically just a computer, albeit a huge, immensely powerful computer possibly comprising acres of computer hardware connected together. For this workshop though, that's just going to be your laptop...we don't provide that kind of computing power.
- This server is what we call the *backend*. This server now processes your request - it could be a request to view the website or something more complicated like an attempt to log in to a dashboard - and sends a response back to your computer. This server will often be programmed in languages such as Python, Ruby on Rails, even Java (but not as much these days). Node.JS is a framework that lets us use Javascript on the backend as well as the frontend.
- Your computer now reads this response and converts it into the webpage you actually see on your computer. This last bit of conversion is what we call the *frontend* doing its work.

![Server- Browser](assets/img/server-browser.png)

So basically, any work done on a server has been programmed into the backend, while anything done inside your browser has been programmed into the frontend. These are the two main components of any website.

You'll see later on that requests aren't just made to the server when we first open the website; it's often faster to make smaller requests first, load the important parts of a webpage and then request additional bits of information when they're needed (think [Facebook's Newsfeed](http://www.facebook.com)). It's also used when we do things like attempt to log in to a website. This is one of the reasons why Javascript is so useful as a frontend programming language, as it allows us to do these kinds of things very easily and update the webpage immediately without having to refresh the page.

![Facebook Loading using Javascript](http://www.product-reviews.net/wp-content/uploads/facebook-not-working.jpg)

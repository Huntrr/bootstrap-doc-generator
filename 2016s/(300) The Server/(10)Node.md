Node.js is, at its core, an environment for using Javascript to program web
servers. Because some people like Javascript, and because we all think PHP
sucks, the Internet in general seems to think Node is pretty cool. So, while we
could feasibly use [any](https://golang.org/) [number](https://secure.php.net/)
of [different](https://www.python.org/) [languages](https://www.java.com/en/) to
make the back-end of our chat client, today the focus will be on Node.

![... Some people like node](http://cdn.meme.am/instances/58571095.jpg)

Again, some of us seem to think its cool. Hopefully, by the end of this, you'll
see why.

First things first, let's install Node. Instructions for installing depend on
your operating system, so keep scrolling until you find the right directions.


#### Mac

The easiest way to install Node is through Homebrew, a package manage for OSX.
Sometimes Homebrew is already installed on your computer, and sometimes you need
to install it. Bring up a terminal window and type `brew install node`. When it
finishes, it might show you a few commands you need to run in Terminal. Run
those commands and you're set!

If instead of that command terminal got angry and said it doesn't know what
`brew` is, it means you don't have Homebrew. No worried. Let's install Homebrew
by typing this into terminal:

`ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`

If Homebrew installs successfully, try `brew install node` again. If that still
doesn't work, try Googling the error text and looking for solutions. If that
doesn't work, look around and ask a mentor to help.

If Homebrew is causing too many problems then just try the installer
[here](https://nodejs.org/download/). You can also install NodeJS using Fink
(`fink install nodejs`) or MacPorts(`port install nodejs`).


#### Windows

It's easy to get Node.js set up with a Windows machine:

1. Download the .msi file from [here](http://nodejs.org/download/)

2. Use the Windows installer to get it set up.


#### Linux

There are about a million different ways to install things on various
Linux-based operating systems. Go to [this
link](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
for a full list.


All set? Let's get started.

### What does server-side really mean?

Till now, we've dealt with HTML, CSS and JavaScript. These are the files that
a server send over the internet to your browser when your browser tries to
navigate to that website. However, as we saw in the last workshop, these files
aren't intelligent, they simply display information that is entered into them.

So real webapps (anything more complicated than a personal landing page) have
servers that use some boilerplate *static files* (i.e. HTML, CSS and JavaScript)
and do their own logic to fill them in with real, intelligent information (the
difference between a recipe that you can write down once - you can make it as
fancy as you want but it's static and won't change - and something that displays
the weight of the person eating all that food in real time - dynamic, because
this would change depending on who the person was and when they check this).
These servers can be written in many languages, right from C to Java to Python
or even Assembly language if you wanted to. In this workshop, we’re going to use
NodeJS, that allows us to use JavaScript to write our server-side code, even
though JavaScript was initially designed to run only inside the web browser and
not on servers.

We usually have servers to do the thinking, databases to store the information
and static files to display this information in the user’s web browser. These de
is a very common JavaScript-based web framework. Node is a framework that lets
us write our own servers in JavaScript to run on our machines. Node is great
because it has modules, which are bits of code other people have already written
that can easily be added to give new functionality to your app. NodeJS has the
most modules of most modern web frameworks, 3 parts come together to form the
core of any website. Often, websites also use APIs (basically a way for websites
to talk to each other) to make their websites more dynamic, or to pull in
information from other websites.

### What is a NodeJS app?

Node is a very common JavaScript-based web framework. Node is a framework that
lets us write our own servers in JavaScript to run on our machines. Node is
great because it has modules, which are bits of code other people have already
written that can easily be added to give new functionality to your app. NodeJS
has the most *modules* of most modern web frameworks, and that’s part of what
makes it really great for writing webapps fast.

Now that you know a bit about Node, let's jump in and explore the different
components of our Node app.


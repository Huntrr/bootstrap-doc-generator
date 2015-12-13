Now that you've got that installed, let's move on to some slightly more complicated stuff. Let's start with Node.JS.

Node.js is a commonly used web framework for building applications with Javascript. You need to run Node from command line. Instructions for different operating systems are below.

_Mac_

The easiest way to install Node is through Homebrew, a package manager for OSX. Sometimes Homebrew is already installed on your computer, and sometimes you need to install it. Bring up a terminal window and type in `brew install node`. When it finishes, it might show you a few commands you need to run in Terminal. Run those commands and you're all set! 

If instead that command spit out something about not knowing what `brew` is, it means you don't have Homebrew installed. No worries. Let's try and install Homebrew by typing this into Terminal: `ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`

If Homebrew installed succesfully, then go ahead and try `brew install node`. If you run into any more errors here, try Googling the error text and looking for solutions. If that still doesn't work, look around for a mentor to help.

If Homebrew is causing too many problems then just try the installer [here](http://nodejs.org/download/). You can also install NodeJS using Fink (`fink install nodejs`) or MacPorts(`port install nodejs`).

_Windows_

It's easy to get Node.js setup with a Windows machine:

1. Download the .msi file from [here](http://nodejs.org/download/)
2. Use Windows Installer to get it set up.

_Linux_

There are about a million different ways to install things on various Linux-based operating systems. Go to [this link](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager) for a full list.

Alright, let's get started.
![Terminal](assets/img/terminal.png)

Terminal (or Command Prompt on Windows) is basically a way for us to access the Command Line. This gives us access to a wonderful variety of things that we can do. We will be spending a good amount of time this weekend in here, so let's take some time to get used to it.

Once you fire up Terminal or Command Prompt (on Windows, you'll later need to run cmd.exe by right clicking on the shortcut and clicking Run as Administrator, you'll know it's running as Admin if your path ends in `../system32`), here are a few simple commands that you can type:

- `ls` (`DIR` on Windows) lists all the files in the current folder
- `cd` allows you to change directory. So `cd Documents` will move into the folder Documents, if there is such a folder in the current directory. You can check this by using `ls` (`DIR` on windows). To move up a directory, say back to where you were before you went into Documents, type in `cd ../`.
- `pwd` prints out the current path you've traversed in the file system. It's particularly helpful once you've used `cd` a few times, and aren't sure where you are anymore.
- `mkdir` allows you to make a folder in the current directory. So `mkdir Such Magic` makes a folder named 'Such Magic'.
- `mv` (`move` on windows) will let you move files and folders. In Terminal you can do `mv ~/Desktop/MyFile.rtf /Volumes/Backup/MyFolder` to move MyFile.rtf. On Windows `move c:\windows\temp\*.* c:\temp` will move everything from `C:\windows\temp` to `C:\temp`. `*` works as a wildcard operator here. Careful with this one - you may not want to move things around haphazardly.

Once you've installed Node.JS (which we'll do in the next workshop), you'll also be able to enter commands like `npm install express` that will use Node Package manager to install plugins such as Express. You'll aso be able to start up MongoDB from here using `mongod`.

### Let's start making stuff!

Whoohoo! We've made it this far, and it's finally time to start making stuff!

#### Sublime Text 2

We've got to install a whole buch of stuff over the next few workshops. Let's start simple, go and download [Sublime Text 2](http://www.sublimetext.com/2). It's the best text editor in existence (yes, that's arguable) and this is where we're gonna be doing all our work. If you have a different favorite text editor, feel free to use it.

NOTE: Sometimes, when you save your work, a window will pop up asking you to buy Sublime. Just ignore this and hit "Cancel" and you can use it forever. Alternatively, you can buy it and support a fellow developer.

### Making a Chat App

Well done! You've got everything you need installed. Now let's test what you've learned in this workshop. Here's an [HTML](assets/files/sample.html) and a [CSS](assets/files/main.css) file. Try and use this as a base to create your own personal chat app. The adventurous ones among you can even try and create a complete static website; you know enough that you can just Google for anything you need. Take a look at some of our organizers' websites for inspiration ([Devesh](http://www.seas.upenn.edu), [Dhruv](http://dhruvagarwal.me)) or browse around the internet to see nice designs (like [Medium](http://medium.com)).

#### Files

You can download the [HTML](assets/files/index.html) and [CSS](assets/files/main.css) files we looked at here by following these links. Use these as starting points for building your personal chat app.

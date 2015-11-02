To run on Mac/Linux, bring up a normal terminal window. On Windows, search your computer for the Node.js Command Prompt application, and open it (it should look very similar to the normal command prompt).

Enter the folder the contains your Node app with simple terminal commands like "cd". Once there, type "node" and hit enter. If you see a blank line that starts with ">", Node is installed properly and you're ready to go. If not, go back to the installation instructions and reinstall.

The first time you run a node app, `cd` into the directory (remember Terminal/Command Line?) and run `npm install`. This installs the *node_modules* folder if it doesn't already exist, and overwrites it if it does. To run the Node app, type `node app.js` into the terminal from the folder that contains app.js.

To see the app working, pull up an Internet browser. In the address bar, enter `localhost:3000`. Since we're running this server on our own machines and not publicly on the internet, our website *domain* is `localhost` (common to all systems) and the port is `3000`. If all goes well, you should be able to see your app!

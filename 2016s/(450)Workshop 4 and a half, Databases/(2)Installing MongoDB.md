Let's move on to MongoDB. Mongo is a NoSQL Database; this means that rather than the data being stored in SQL tables, it's stored in some other format. In the case of MongoDB, the format is **BSON**, which is a more efficient way of storing JSON. Like other databases, we can store, search and access large amounts of data very quickly.

_Mac (OS X)_

Assuming you have Homebrew installed by this point you can just type `brew install mongodb` into terminal. Then, if all goes well, mongodb should show you three different commands that you should copy-paste into Terminal and run. Before you start mongo for the first time, run `mkdir -p /data/db` to create the default location for the database.

In case you run into any problems, [look at MongoDB's full instructions page](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) and Google around before asking mentors for help.

_Windows_

MongoDB has a full set of instructions [here](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/) that you should follow through till you can run MongoDB. You most probably just need to install the 64-bit version of MongoDB using their installation file. Before you run Mongo for the first time, you'd need to run this from Command Prompt: `md \data\db`. Follow the instructions on the above link to run MongoDB.

_Linux_

Most Linux distros should have MongoDB available for installation in their respective package managers (`apt-get`, `yum`, `pacman`, etc.). Alternately, you can read the full instructions to install MongoDB on Ubuntu can be found [here](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/).

Before you start mongo for the first time, run `mkdir -p /data/db` to create the default location for the database.

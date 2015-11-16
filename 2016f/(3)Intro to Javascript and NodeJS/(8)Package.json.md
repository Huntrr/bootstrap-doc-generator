This is a basic JSON file that describes the app we're building and its associated *dependencies*. Dependencies are basically modules, or other pieces of software that somebody else made, that lets us do things, like use Express, the module that makes it really easy to create webapps using NodeJS. This file lists the minimum version we require for each of the modules (if for example, only v2.0 and above of a module has a feature that we need). When we run `npm install` via command line, the package manager goes and finds modules that are least the version we've specified, and installs them. It's actually pretty neat!

```json
{
"Name": "code-weekend", // Module name 
"Version": "v1.0.0", // Version number 
"Private": true, // keep this node app private 
"Dependencies": {
"express": "^v1.0.0"
}
}
```

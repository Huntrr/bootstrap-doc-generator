As we can see, most of the code follows from the very basic HTML structure you saw earlier on in the first workshop. This file builds the first landing page for the application and a basic web form for creating a new one. 

```html
<html>
<head>
<title>{{ title }}</title>
<link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
<h1>{{ title }}</h1>
{{#message}}
<h3>{{message}}</h3>
{{/message}}
<p>Welcome to {{ title }}. Your notes:</p>
<ul>
{{#notes}}
<li><a href='/{{ id }}'>{{ title }}</a></li>
{{/notes}}
{{^notes}}
<li>You don't have any notes yet!</li>
{{/notes}}
</ul>
<p>Make a new note:</p>
<form action='/create' method='post'>
<input type='text' name='title' placeholder='Title'><br/>
<textarea name='body' rows='8' cols='80' placeholder='Body'></textarea><br/>
<input type='submit' value='Save Note'>
</form>
</body>
</html>
```

If you look carefully, you'll see that some parts of this code are a little different from the basic syntax we introduced you to. That's right, you're probably confused about what lines of code like this mean:

```html
{{ title }}
```

The way this works, is that the application dynamically treats these fields as variables and fills them in when the app is run. It then sends the filled in HTML file to the client's web browser. In this way, we only ever have to state, for example, the title of the application, once while sending the command to render the template - and it'll change everywhere around the views.

The page gets access to all these variables from the object that gets passed to the page when we use `res.render` from our Node backend. So `{{ title }}` just prints out whatever the contents of the attribute `title` is from that object. The syntax `{{#notes}}` is the same as saying "if the notes attribute is non-empty/non-null, then display everything between this and `{{/notes}}`" and `{{^notes}}` is the same idea, but if the notes variable is empty/null.

Let's now move on to the next view.

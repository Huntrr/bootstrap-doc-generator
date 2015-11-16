The code in this file is mainly used to build a generic view for any error that our application may have to handle and process.

```html
<html>
  <head>
    <title>Error</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1>{{ errorMessage }}</h1>
    {{#error}}
    <h3>{{ status }}</h3>
    <pre>{{ stack }}</pre>
    {{/error}}
  </body>
</html>
```

As you can see above, the `errorMessage`, `status` and `stack` will all be dynamically completed, depending on the error. This means the screen will be structually identical for any error that we display - even if the content is different.

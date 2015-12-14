> Giphy AJAX

That's surely a term that made no sense to anyone a decade ago.

So we have a Giphy API exposed on our server. How do we access it? Well, with
[AJAX](https://goo.gl/PXhMsS) of course! AJAX stands for Asynchronous
Javascript and XML and it's a very common protocol for sending HTTP requests
using Javascript. Here, we'll create a `/giphy` command that uses AJAX to send
a `GET` request to our server for the right Giphy image, and then we'll send
that image using `sendImage`. Let's jump back into `client/js/socket-client.js`
and see how that works.

In `sendCommand`, beneath the `image` case (but still about the `default`
case), you'll want to add this block:

```javascript
case 'giphy':
  params.shift();
  var term = params.join(' ');
  console.log('Giphy request of: ' + term);
  $.ajax({
    method: "GET",
    url: "giphy/json/" + term,
  }).done(function (result) {
    if(result.data.image_url == undefined) {
      postMessage(errorColor, 'ERROR: No results for giphy search of "'
                  + term + '"');
    } else {
      sendImage(result.data.image_url);
    }
  });

  break;
```

This creates the `giphy` command. The bulk of the command work is done in this
call to `$.ajax`. This is JQuery's built in AJAX handler. It's used by passing
it an object with options. The options we use here are `method` (`GET`) and
`url` (we want the `giphy/json/` endpoint since we want to retrieve json data,
and we also pass it our search term). Then, we use `.done` on this AJAX
request, which lets us pass a function to be called when the AJAX request is
complete. We have to do this since AJAX is asynchronous, meaning it run
separate from the rest of our code.

In that `.done` function, we handle the results of the request -- our callback
takes a `result` parameter with those results. If no image is found, we return
an error. If an image is found, we call `sendImage` on the
`result.data.image_url` that was passed back.

That should be it. If we run the server now and navigate to `localhost:3000`,
we should be able to use all of our commands. `/giphy <search terms>` should
result in `.gif`s, and everything should work as intended.

There's obviously a lot more to be done with AJAX. If you want to learn more,
the [jQuery docs](http://api.jquery.com/jquery.ajax/) are a great place to
start.

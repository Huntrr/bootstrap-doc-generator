In the same directory as your other .js files, write to venmo.js. We'll go through it line by line. First off, list dependencies, request, express, and router, which you've used before. We won't focus on those now, but to review: 

```javascript    
var request = require('request');
var express = require('express');
```
We'll use the express router.
```javascript
var router = express.Router();
```

Next, we have a few lines of Venmo configuration - information identifying our application (fill this in with your App Secret and ID, which you got when you created an application on the Venmo Developer Console page), the location of the Venmo authentication service, the location that Venmo should redirect to after a user authenticates (so that we can authenticate our application), and the API url where we can send payment requests. All of this is copy-pasted from the Venmo documentation.

```javascript
var clientId = 'FILL ME IN FROM YOUR ACCOUNT';
var clientSecret = 'FILL ME IN FROM YOUR ACCOUNT';
var authorizeUrl = 'https://api.venmo.com/v1/oauth/authorize?client_id=' + clientId + '&scope=make_payments%20access_profile&response_type=code';
var accessTokenUrl = 'https://api.venmo.com/v1/oauth/access_token';
var paymentUrl = 'https://api.venmo.com/v1/payments';
```

After the five lines of Venmo config are three separate routes, for

```javascript
'/'
'/authorize'
'/oauth'
```

As you know, each of these routes is activated when the proper URL is requested by your app's adoring fans. As a reminder, the fact that the function call is "router.get" does not mean you're "getting" something from the router (like Java's ArrayList.get()), it means it's responding to a HTTP GET call from the browser.

Let's go through each of the routes. First up is the "root" or "/" Venmo page.
```javascript
router.get('/', function(req, res) {
```
First off, we initialize the variable venmo.
```javascript
venmo = null;
```

This variable will hold the user's Venmo information. The next thing we do is check to see if we have a cookie with the info (meaning the user has already logged in). Regardless, it then renders "venmo.hjs", the actual HTML document that the user will see. We'll go over this in a bit.
```javascript
if (req.session.venmo) {
venmo = req.session.venmo.user;
}

return res.render('venmo', {
venmo: venmo
});
}); // end '/' route
```

Second up is `'/authorize'`. The user clicks on a link from the root Venmo page to come here, and its one line of code is why you had to tell Venmo what your Web Redirect URL was. When the user hits this page, you hand them off to Venmo (notice how you send them the authorizeUrl defined at the top of the file.) After they log in, Venmo sends them back to "/oauth", which is the path you define next!
```javascript
router.get('/authorize', function(req, res) {
return res.redirect(authorizeUrl);
});
```

The next route in our Venmo app, `'/oauth'`, is the second part of Venmo's verification process. We already sent the user to Venmo so that Venmo could tell us they were all set. They called our `/oauth` page, and passed it req.query.code if the authorization went well. The first if statement under router.get('oauth') simply means that if the authorization failed, we don't continue with the exchange.

```javascript
router.get('/oauth', function(req, res) {
if (!req.query.code) {
return res.send('no code provided');
}
```

In the event that the authorization went through, Venmo needs to verify us as a developer. This is where the request module comes into play. We actually have to make a call directly to Venmo's website (using their API). Notice that we're using a POST request, sending them both our unique clientId and clientSecret, and req.query.code, which Venmo sent back to us.

```javascript
request.post({
url: accessTokenUrl,
form: {
client_id: clientId,
client_secret: clientSecret,
code: req.query.code
}
}, function(err, response, body) {
```

If this all checks out on Venmo's side, what we get back,

```javascript
req.session.venmo = JSON.parse(body);
```

is a session from Venmo that's unique between your application and your client, so Venmo knows that future payment requests are legit. If all goes well, it prints a notice to the user that they've been authenticated, and redirects them to your app's Venmo hompage.

```javascript
req.session.message = 'Authenticated Venmo successfully!';
return res.redirect('/venmo');
});
}); // end '/oauth' route
```

Our last route in venmo.js, `router.post('/send')`, is where the magic happens. Handshakes have gone through, and if your user types in the amount, phone #, and note fields properly (checked by the first if statement), you're ready to do a payment.

This takes the form of another POST request to Venmo's API. You send them the relevant transfer information, as well as the unique user/client token that you generated in "/oauth." The following code defines how you handle this.

```javascript
router.post('/send', function(req, res, next) {
var amount = req.body.amount;
var phone = req.body.phone;
var note = req.body.note;

if (!(amount && phone && note)) {
req.session.message = 'You must provide all three fields!';
return res.redirect('/venmo');
}

request.post({
url: paymentUrl,
form: {
access_token: req.session.venmo.access_token,
phone: phone,
amount: amount,
note: note
}
}, function(err, response, body) {
if (err) {
next(err);
}

var recipient = JSON.parse(body).data.payment.target.user.display_name;
req.session.message = 'Sent $' + amount + ' to ' + recipient + ' successfully!';

return res.redirect('/venmo');
});
});
```

What does this code do? It first says that we are listening for post requests on the route `/send`, which is where our form will be submitting its request (more on that below). We expect 3 form inputs - if any of these don't exist, we create an error page and redirect back to the main page.

If the form was submitted correctly, we send a post request containing this information to Venmo's payment API (recall we defined `paymentUrl` at the top). We also include the access token, which is part of the `venmo` cookie (we created this in the `oauth` route when we get a response to our authentication post request).

Next, look at the callback function to this post request. First, it checks to see if Venmo returned an error. If not, it continues, and parses the Venmo response for user data. Finally, it prints a message to the user telling them that the payment was successful, and it redirects them back to the root Venmo page!

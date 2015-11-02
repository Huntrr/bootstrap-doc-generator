Let's incorporate one other API. Unlike Venmo, SendGrid doesn't use OAuth, and so is much easier to include.

First, we make a SendGrid developer account. Go to [SendGrid](https://sendgrid.com) and register. Then, import the SendGrid module at the top of venmo.js
```javascript
var sendgrid = require("sendgrid")("username", "password");
```

Next, we write a function to send an email. Fill in your email address for my_email.
```javascript
var sendEmail = function (phone, amount) {
var my_email = "your email address";
var email = new sendgrid.Email();

email.addTo(my_email);
email.setFrom("venmo@codeweekend.com");
email.setSubject("Your Venmo Payment");
email.setHtml("You paid " + phone + " $" + amount + "! Hope it was worth it!");

sendgrid.send(email);
}
```

This is fairly self-explanatory, and is copied directly from the SendGrid developer documentation.

Finally, we call this function at the end of the `router.post('/send')` route.
```javascript
sendEmail (req.body.phone, req.body.amount);
```

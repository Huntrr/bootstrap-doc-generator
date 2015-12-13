Now, especially if you learned HTML/CSS earlier this weekend, you may be wondering, "what actually is determining what the user sees at page /vemno?" What a great question! They're seeing `views/venmo.hjs`!

You've seen .hjs before, but to recap, the biggest difference between .hjs and html is that you update certain parts of it dynamically based on what we tell NodeJS. So, if we were to change the value of `req.session.message` in the last block of code,

```javascript
req.session.message = "yodelyodelyoda"
```

In venmo.hjs, when you see

```html
{{#message}}
<h3>{{message}}</h3>
{{/message}}
```

You're taking req.session.message and inserting it into {{message}} in venmo.hjs!

Take note that the field,

`{{#message}}` means "if this field is present, show the following",

`{{^message}}` means "if this field is not present, show the following", and

`{{/message}}` just closes these blocks.

This becomes more important at the next "if statement",

```html
{{#Venmo}}
code
{{/venmo}}
```

There's a lot of code between these tags, and none of it is shown unless the "Venmo" field, denoting that the user has authenticated, is present. This is important, because not only does the Venmo variable decide what would be shown if you happened to include `{{Venmo}}` as part of the text, but it actually acts as an "if" statement for what should be shown to the user.

So, let's assume that the user has authenticated. In this case, it shows the fields `{{display_name}}` and `{{username}}`, and most importantly, includes a `<form>`. Let's see the whole thing: 

```html
<form action='/venmo/send' method='post'>
Pay $<input type='text' name='amount' placeholder='Amount in dollars'> to
<input type='text' name='phone' placeholder='Phone Number'> for:<br/>
<textarea name='note' rows='3' cols='80' placeholder='For...'></textarea>           <br/>
<input type='submit' name='Send Payment'>
</form>
```

The form action designates what type of call the the browser will make when the form is submitted. In this case, the form is for the user to actually make a payment, and we have a venmo.js route that we created to handle a POST request to /venmo/send, so we want the browser to send the request to that URL (action='/venmo/send'), with POST (method='post').

In this form, there are 3 input fields. The first is the total amount of money being transfered. While we will parse it as a decimal, its input `type='text'`. The 'name' field we use to tell our app what variable it is assigned to, so we can access it in venmo.js. The placeholder, as you can probably tell, determines what is shown when the user has not yet typed anything in.

The next field is, by most measures, the same. Make sure to note, however, that the field name is assigned the value 'phone', again so we can reference the input as a variable by that name in venmo.js. The third field is of type `<textarea>` instead of type `<input>`. The biggest difference between a textarea and an input to understand is that a textarea has better accounting for large input of paragraph-length. Note that we specify the field `rows='3'`, and `cols='80'`. Thus, unlike an `<input>`, we can guess that this field might be a sentence or two but probably no longer, and tailor the size of hte textfield to that. Furthermore, it handles newlines well, so the user can happily use multiple paragraphs.

The final important piece of your form is `<input type='submit' name='Send Payment.'>`. Note that the `type='submit'` field is not specifying a variable, but is a keyword in your form that your browser knows to interpret as a submission of the form. the name field determines what is shown on the button. Because this submit button is within the same form as the other input fields (see that it comes before the ending `</form>` tag), it will submit everything within that form.

Notice now the end tag {{/venmo}}. This is the end of our if statement. i.e., if the user hadn't authenticated yet, she would have seen none of what we just went over. Now, on the next lines, we see

```html
{{^Venmo}}
<p>You have not authorized yet. <a href='/venmo/authorize'>Click here</a> to authorize with venmo.</p>
{{/venmo}}
```

So, if `{{#Venmo}}` is the beginning of an if statement, `{{^Venmo}}` is the beginning of an "if not" statement. Thus, the first time your user sees a Venmo page, since they will not yet have authenticated, this statement will return "true", and they'll be given the link to the "authorize" page, and be allowed to authorize. Not very tricky, very cool. As always, make sure to end your if with a `{{/venmo}}`, just like you always remember to end your <strong> tags, right? Right. ... </strong>.

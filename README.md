# Alertme API

## Prerequisites

This library is for use with the Alertme notification system.  Visit our [github page](https://www.alertmehub.com/) for information on getting started. 

## Installation

```
npm install alertme-api
```

## Create the api client object

Passing in an API key
```js
const Alertme = require('alertme-api-node');
const client = new Alertme('YOUR_API_KEY');
```

Using an API key stored in an environment variable
```js
//Create an env var as ALERTME_API_KEY
const Alertme = require('alertme-api-node');
const client = new Alertme();
```

## Acquire a customer token

One use of this client library is to get an auth token for one of your customers, which you then pass into the Alertme UI component.  It is important that the call to get the token be done on the server-side, as to not expose your API key in client-side code.  The token returned is safe to expose.

Here is an example of a server-side function that retrieves a customer token:

```js
async function getSubscriberToken(req, res) {
  try{
    // Do whatever authentication is appropriate for your customer
    if (!authenticateUser(req, res)) return;

    // Retrieve Data - using whatever ID you have for your customer
    let token = await alertmeClient.getSubscriberToken(req.user.unique_name);

    // Return
    res.status(200).json(token);
  }
  catch(error){
      res.status(500).send(error);
  }
}
```

getSubscriberToken returns a promise - use async/await or .then() to get access to the token.

## Publish an alert

The second scenario that this API implements is publishing an alert to the Alertme service.

```js
    alertmeClient.publishAlert("my-topic");
```

The code above will publish an alert to the specified topic, and everyone subscribed to that topic will receive the alert on the channel(s) (email, sms) that they indicated.

You can also provide parameters via a 2nd options argument, so that only subscribers who meet the criteria receive the alert.

```js
    alertmeClient.publishAlert("concert-alert", {
        parameters:{"band.itemName": "Foo Fighters"}
    });
```

You can also pass substitution data to tailor the alert text.

```js
    alertmeClient.publishAlert("concert-alert", {
        parameters:{"band.itemName": "Foo Fighters"},
        data: {"band": "Foo Fighters", "venue": "The Anthem", "when": "Tuesday, March 4th"}
    });
```

The alert text could be configured something like this:
```
Hey! The {{band}} are coming to {{venue}} on {{when}}.
```

# Socket-lite

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.



##Use Cases

#### a barebones web socket

There are a few configuration parameters.  If you want to implement a heartbeat.  Turned off by default.  Set the heartbeat to true.  Configurations can be made in your 
/config/environment.js

Example:

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
		heartbeatEnabled: true,
		websocketUri: "ws://localhost:4000",
		heartbeatString: "heartbeat"
    }
	
	
	
They are as followes:

heartbeatEnabled (default is false) expects a string sent from the server at a regular interval.  

heartbeatString: the string the server will send at regular interals.

websocketUri:  the path to your websocket server including the port.

Once you have configured your  enviroment file.  You can use this intializer in your views, controllers and adapters like this:

	this.socket.onmessage(function(message){
	console.log("message");
	}
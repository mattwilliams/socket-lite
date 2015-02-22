

export default function Socket(container, application){
	console.log("SOCKET!");
	this.container = container;
	this.application = application;
  	this.isStarted = false;
  	this.alreadyConnected = false;
	this.ws = null;
	this.heartbeat_interval = null;
	this._callbacks = {onmessage:[]};
	
	
	
	/* var socket = new mysocket(container, application);
	 socket.start();

	container.register('socket:main', socket, {instantiate: false} );
    container.injection('adapter', 'socket', 'socket:main');
    container.injection('controller', 'socket', 'socket:main');
    container.injection('view', 'socket', 'socket:main');
    container.injection('initializer', 'socket', 'socket:main');*/
	
}

Socket.prototype.start = function start(){
	
  console.log("start");
 
 this.ws = new WebSocket('ws://localhost:4000');
 
 //hmmmm
 this._callbacks.onmessage = [];
 
 //only deferr the readiness if this is the first instance of start
 if(this.isStarted === false){
 	this.application.deferReadiness();
	this.isStarted = true;
 }
 
	window.missed_heartbeats = 0;

	var self = this;
	
	this.ws.onopen = function(){
		
		console.log("open");
		
		//same as deferr readiness only advance the readiness if it is the first instance of start
	 
		  if(self.isStarted === true){
			  if(self.alreadyConnected === false){
				  console.log("ADVANCE READINESS");
				  self.application.advanceReadiness();
				self.alreadyConnected = true;
			  } 
		  }
	  

		  console.log("app ready socket is open");
   	  

   	    if (self.heartbeat_interval === null) {
 	   
   	        self.heartbeat_interval = setInterval(function() {
   	            try {
					//console.log("increment the heartbeat");
					//console.log(window.missed_heartbeats);
   	                window.missed_heartbeats = window.missed_heartbeats + 1;
					//console.log(window.missed_heartbeats);
   	                if (window.missed_heartbeats >= 3)
   	                    throw new Error("Too many missed heartbeats.");
					//console.log(window.missed_heartbeats);
				
                
   	            } catch(e) {
   	                clearInterval(this.heartbeat_interval);
   	                this.heartbeat_interval = null;
   	                console.warn("Closing connection. Reason: " + e.message);
					this.ws.close();
   	            }
   	        }, 5000);
   	    }				
	}
	
	this.ws.onclose = function(){
	    console.log("Re open the socket");
	    self.start();
	}
	
	
	this.ws.onmessage = function(message){
		console.log(message.data);
		//offer the same callback handler as html5 websocket.
		self.onmessage(message);
		  
		  if(message.data === "heartbeat"){

			  window.missed_heartbeats = 0;
			  console.log(window.missed_heartbeats);
	  
			  return
		  }
		  
	}
	
}

Socket.prototype.onmessage = function(message) {
    console.log(">>> call the message " + message.data);
    for (var i=0; i<this._callbacks['onmessage'].length; i++)
        this._callbacks['onmessage'][i](message.data);
};
Socket.prototype.addListener = function(functionName, handler) {
    this._callbacks[functionName].push(handler);
};
import liteSocket from "socket-lite/initializers/lite-socket";



export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
	 console.log("SOCKET INITIALIZER");

	 var socket = new liteSocket(container, application);
	 socket.start();

	 container.register('socket:main', socket, {instantiate: false} );
     container.injection('adapter', 'socket', 'socket:main');
     container.injection('controller', 'socket', 'socket:main');
     container.injection('view', 'socket', 'socket:main');
     container.injection('initializer', 'socket', 'socket:main');
  
}

export default {
  name: 'lite-socket',
  initialize: initialize
};


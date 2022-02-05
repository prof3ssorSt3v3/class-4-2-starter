//communication types
// Reference guide - https://web.dev/two-way-communication-guide/
//1. BroadcastChannels
//browser 1
const browser1 = {
  broadcast: new BroadcastChannel('UniqueName'),
  init: () => {
    browser1.broadcast.addEventListener('message', browser1.gotMessage);
  },
  sendMessage: (msg) => {
    browser1.broadcast.postMessage(msg);
  },
};
//service worker 1
let broadcast1 = new BroadcastChannel('UniqueName');
//add listener
broadcast1.onmessage = getMessage1;
//send message
function sendMessage1(msg) {
  broadcast1.postMessage(msg);
}
function getMessage1(ev) {
  if (ev.data) {
    //process message...
  }
}

//2. Client API
//browser 2
const browser2 = {
  init: () => {
    //listen
    navigator.serviceWorker.onmessage = (ev) => {
      if (ev.data) {
        //process response
      }
    };
  },
  sendMessage: (msg) => {
    //send message
    navigator.serviceWorker.controller.postMessage(msg);
  },
};
//service worker 2
//listen to messages
self.addEventListener('message', (ev) => {
  if (ev.data) {
    //Process message
  }
});
//send a message
function sendMessage2(msg) {
  //Obtain an array of Window client objects
  self.clients.matchAll(options).then(function (clients) {
    if (clients && clients.length) {
      //Respond to last focused tab
      clients[0].postMessage(msg);
    }
  });
}

//3. Message Channel
//browser 3
const browser3 = {
  messageChannel: new MessageChannel(),
  init: () => {
    //...send port 2 to the sw to use
    //Init port
    let sw = navigator.serviceWorker.controller || APP.SW;
    sw.postMessage({ type: 'PORT_INITIALIZATION' }, [
      browser3.messageChannel.port2,
    ]);
    //Listen to messages
    messageChannel.port1.onmessage = browser3.getMessage;
  },
  sendMessage: (msg) => {
    let sw = navigator.serviceWorker.controller || APP.SW;
    sw.postMessage(msg);
  },
  getMessage: (ev) => {
    // Process message from
    // ev.data
  },
};
//service worker 3
const msgPort = null;
//Save reference to port
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PORT_INITIALIZATION') {
    msgPort = event.ports[0];
  }
});
//send messages
function sendMessage3(msg) {
  //Send messages
  msgPort.postMessage(msg);
}

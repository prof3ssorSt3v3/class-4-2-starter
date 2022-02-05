const APP = {
  isOnline: 'onLine' in navigator && navigator.onLine,
  SW: null, //NEW CODE
  init: () => {
    //register the service worker
    //serviceWorker.state returns one of installing, installed, activating, activated, waiting, or redundant

    navigator.serviceWorker.register('/sw.js').catch(function (err) {
      // Something went wrong during registration. The sw.js file
      // might be unavailable or contain a syntax error.
      console.warn(err);
    });

    navigator.serviceWorker.ready.then((registration) => {
      // .ready will never reject... just wait indefinitely
      console.log(registration);
      APP.SW = registration.active;
      //save the reference to use later or use .ready again
    });

    navigator.serviceWorker.oncontrollerchange = (ev) => {
      //new service worker replacing the old one
      console.log('New service worker taking control', ev.target);
      //APP.SW = ev.target;
    };
    APP.addListeners();
  },
  addListeners: () => {
    window.addEventListener('online', APP.changeStatus);
    window.addEventListener('offline', APP.changeStatus);

    console.log('add message listener to service worker reference.');
    navigator.serviceWorker.addEventListener('message', APP.gotMessage);
  },
  changeStatus: (ev) => {
    //switched between online and offline
    console.log('becoming', ev.type); //'online' or 'offline'
    APP.isOnline = ev.type === 'online' ? true : false;
    let msg = {
      isOnline: APP.isOnline,
    };
    //sending message to service worker
    //let sw = navigator.serviceWorker.controller || APP.SW;
    // sw.postMessage(msg);
    // OR
    navigator.serviceWorker.ready.then((registration) => {
      registration.active.postMessage(msg);
    });

    if (APP.isOnline) {
      document.body.classList.remove('offline');
    } else {
      document.body.classList.add('offline');
    }
  },
  gotMessage: (ev) => {
    //received a message from the service worker.
    console.log(ev.data);
    console.log(ev.origin);
  },
};

//NEW CODE
document.addEventListener('DOMContentLoaded', APP.init);

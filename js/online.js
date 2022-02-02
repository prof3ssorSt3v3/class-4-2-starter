const APP = {
  isOnline: 'onLine' in navigator && navigator.onLine,
  init: () => {
    window.addEventListener('online', APP.changeStatus);
    window.addEventListener('offline', APP.changeStatus);
    window.addEventListener('message', APP.gotMessage);
  },
  changeStatus: (ev) => {
    //switched between online and offline
    console.log(ev.type); //'online' or 'offline'
    APP.isOnline = ev.type === 'online' ? true : false;
    let msg = {
      isOnline: APP.isOnline,
    };
    navigator.serviceWorker.controller.postMessage(msg);
  },
  gotMessage: (ev) => {
    //received a message from the service worker.
    console.log(ev.data);
  },
};

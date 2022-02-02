const APP = {
  init: () => {
    //register the service worker
    navigator.serviceWorker.register('/sw.js');
  },
};

document.addEventListener('DOMContentLoaded', APP.init);

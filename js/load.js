'use strict';

// Load wizardsData from server
(function () {

  window.load = function (URL, onLoad) {
    var onErrorHandler = function (message) {
      var errorHeader = document.createElement('div');
      errorHeader.style = 'z-index: 100; margin: 0 auto; text-align: center';
      errorHeader.style.color = '#000';
      errorHeader.style.backgroundColor = '#da641a';
      errorHeader.setAttribute('width', '100%');
      errorHeader.setAttribute('height', '5vh');
      errorHeader.style.fontSize = '25px';

      errorHeader.textContent = message;
      document.body.insertAdjacentElement('afterbegin', errorHeader);
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onErrorHandler('Unknown status: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onErrorHandler('Server conection failed');
    });

    xhr.addEventListener('timeout', function () {
      onErrorHandler('Request wasn\'t complete by: ' + xhr.timeout + ' ms');
    });

    xhr.timeout = 5000;

    xhr.open('GET', URL);
    xhr.send();
  };

})();


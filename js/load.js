'use strict';

// Load wizardsData from server
(function () {

  window.load = function (URL, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Unknown status: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Server conection failed');
    });

    xhr.addEventListener('timeout', function () {
      onError('Request wasn\'t complete by: ' + xhr.timeout + ' ms');
    });

    xhr.timeout = 5000;

    xhr.open('GET', URL);
    xhr.send();
  };

})();


'use strict';

// Load wizardsData from server
(function () {
  var onErrorHandler = function (message) {
    var errorHeader = document.createElement('div');
    errorHeader.style = 'z-index: 100; margin: 0 auto; text-align: center;';
    errorHeader.style.color = '#000';
    errorHeader.style.backgroundColor = '#da641a';
    errorHeader.setAttribute('width', '100%');
    errorHeader.setAttribute('height', '5vh');
    errorHeader.style.fontSize = '25px';

    errorHeader.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorHeader);
  };

  window.load = function (url, onLoad) {
    var scriptOk = false;

    var checkCallback = function () {
      if (!scriptOk) {
        onErrorHandler('Unknown error ocured: script failed to load');
      }
    };

    var script = document.createElement('script');

    // check if script is being loaded
    script.addEventListener('readystatechange', function () {
      if (script.readyState === 'complete' || script.readyState === 'loaded') {
        scriptOk = true;
      } else {
        checkCallback();
      }
    });

    script.onload = script.onerror = checkCallback;
    script.src = url + '?callback=setup.' + onLoad.name;

    document.head.appendChild(script);
    // typeof onLoad === function && onLoad([{...}]);
  };

})();


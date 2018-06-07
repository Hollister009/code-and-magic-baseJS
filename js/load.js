'use strict';

// Load wizardsData from server
(function () {
  window.load = function (url, onLoad) {
    var loader = document.createElement('script');
    loader.src = url + '?callback=' + onLoad.name;
    document.body.append(loader);
    onLoad();
  };

})();

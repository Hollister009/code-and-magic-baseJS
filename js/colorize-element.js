'use strict';

// Unificated behavior of coloring elements
(function () {
  window.colorizeElement = function (element, color, fillFunc) {
    element.addEventListener('click', function () {
      fillFunc(element, window.util.getRandomElement(color));
    });
  };
})();

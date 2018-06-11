'use strict';

// Additional functions
(function () {
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEYCODE_ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEYCODE_ENTER) {
        action();
      }
    },
    getFullName: function (name, surname) {
      var fullName = name + ' ' + surname;
      return fullName;
    },
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    colorizeElement: function (element, color, fillFunc) {
      element.addEventListener('click', function () {
        fillFunc(element, window.util.getRandomElement(color));
      });
    }
  };

})();

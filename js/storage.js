'use strict';

(function () {
  // Implemented player saving functionality
  var playerInfo = {};

  var setStorage = function () {
    var character = {
      'username': window.dialog.querySelector('.setup-user-name'),
      'coat-color': window.setup.player.querySelector('.wizard-coat'),
      'eyes-color': window.setup.player.querySelector('.wizard-eyes'),
      'fireball': window.dialog.querySelector('.setup-fireball-wrap')
    };
    playerInfo['username'] = applyItem(character['username']);
    playerInfo['coat-color'] = applyItem(character['coat-color']);
    playerInfo['eyes-color'] = applyItem(character['eyes-color']);
    playerInfo['fireball'] = applyItem(character['fireball']);
  };

  var applyItem = function (element) {
    if (element.hasAttribute('style')) {
      var keyStyle = element.style.fill !== '' ? element.style.fill :
      element.style.backgroundColor;
      return keyStyle;
    }
    // else if element hasAttribute('value'))
    return element.value;
  };

  var saveForm = document.querySelector('.setup-wizard-form');
  var onSaveAction = function (evt) {
    evt.preventDefault();
    setStorage();
    localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
  };

  saveForm.addEventListener('submit', onSaveAction);
})();

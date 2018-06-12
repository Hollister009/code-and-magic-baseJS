'use strict';

(function () {

  // Calculate similar wizards
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var updateWizards = function () {
    window.setup.allWizards(wizards.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
        }
        return rankDiff;
      }));
  };

  // Callback function
  var prevTimer;

  window.similar = {
    onEyesChange: function (color) {
      eyesColor = color;
      window.clearTimeout(prevTimer);
      prevTimer = window.setTimeout(function () {
        updateWizards();
      }, 750);
    },
    onCoatChange: function (color) {
      coatColor = color;
      window.clearTimeout(prevTimer);
      prevTimer = window.setTimeout(function () {
        updateWizards();
      }, 750);
    }
  };

  // Get wizards array from a server response
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (message) {
    var errorInfo = document.createElement('div');
    errorInfo.style = 'z-index: 100; margin: 0 auto; text-align: center';
    errorInfo.style.color = '#000';
    errorInfo.style.backgroundColor = '#da641a';
    errorInfo.setAttribute('width', '100%');
    errorInfo.setAttribute('height', '5vh');
    errorInfo.style.fontSize = '25px';

    errorInfo.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorInfo);
  };

  window.load(URL, successHandler, errorHandler);

})();

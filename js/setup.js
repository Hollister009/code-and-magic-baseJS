'use strict';

(function () {

  // Wizards data
  var wizardData = {
    NAMES: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COATS: [
      'rgb(101, 137, 164)',
      'rgb(215, 210, 55)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(0, 0, 0)',
      'rgb(215, 210, 55)',
      'rgb(56, 159, 117)',
      'rgb(241, 43, 107)'
    ],
    EYES: ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'],
    FIREBALLS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  // Setting up similiar wizards list
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  window.dialog.querySelector('.setup-similar').classList.remove('hidden');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var clearSimilarWizards = function () {
    while (similarListElement.firstChild) {
      similarListElement.removeChild(similarListElement.firstChild);
    }
  };

  window.setup = {
    allWizards: function (array) {
      var similarWizardsLength = 4;
      if (similarListElement.innerHTML !== '') {
        clearSimilarWizards();
      }
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < similarWizardsLength; i++) {
        fragment.appendChild(renderWizard(array[i]));
      }
      similarListElement.appendChild(fragment);
    }
  };

  // Player settings
  var playerSetup = document.querySelector('.setup-wizard');
  var playerCoat = playerSetup.querySelector('.wizard-coat');
  var playerEyes = playerSetup.querySelector('.wizard-eyes');
  var playerFireball = window.dialog.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  // click.evt ---> clearSimilarWizards ---> getRandomElement ---> fillFunc --->
  // onChange(updateWizards) ---> window.render.allWizards(array.sort ---> getRank x2) ---> renderWizard
  playerCoat.addEventListener('click', function () {
    var newColor = window.util.getRandomElement(wizardData.COATS);
    fillElement(playerCoat, newColor);
    window.similar.onCoatChange(newColor);
  });

  playerEyes.addEventListener('click', function () {
    var newColor = window.util.getRandomElement(wizardData.EYES);
    fillElement(playerEyes, newColor);
    window.similar.onEyesChange(newColor);
  });

  window.util.colorizeElement(playerFireball, wizardData.FIREBALLS, changeElementBackground);

  // Draggable artifacts to inventory
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  var onDragStart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    artifactsElement.style.outline = '2px dashed red';
  };
  shopElement.addEventListener('dragstart', onDragStart);

  var onDragOver = function (evt) {
    evt.preventDefault();
    artifactsElement.removeAttribute('style');
    return false;
  };
  artifactsElement.addEventListener('dragover', onDragOver);

  var onDropEvent = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem.cloneNode(true)).setAttribute('draggable', false);
    evt.preventDefault();
  };
  artifactsElement.addEventListener('drop', onDropEvent);

  var onDragEnter = function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  };
  artifactsElement.addEventListener('dragenter', onDragEnter);

  var onDragLeave = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  };
  artifactsElement.addEventListener('dragleave', onDragLeave);

  var onStarRemove = function (evt) {
    var node = evt.target;
    if (node.tagName.toLowerCase() === 'img') {
      node.parentNode.removeChild(node);
    }
  };
  artifactsElement.addEventListener('click', onStarRemove);

})();

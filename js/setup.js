'use strict';

(function () {

  // Wizards data
  var wizardData = {
    NAMES: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COATS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALLS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  // Create wizards array
  var similiarWizardsNumber = 4;
  var getWizards = function (names, surnames, coatColors, eyesColors) {
    var Wizards = [];
    for (var i = 0; i < similiarWizardsNumber; i++) {
      Wizards[i] = {};
      var name = window.util.getRandomElement(names);
      var surname = window.util.getRandomElement(surnames);
      Wizards[i].name = window.util.getFullName(name, surname);
      Wizards[i].coatColor = window.util.getRandomElement(coatColors);
      Wizards[i].eyesColor = window.util.getRandomElement(eyesColors);
    }
    return Wizards;
  };

  var allWizards = getWizards(wizardData.NAMES, wizardData.SURNAMES, wizardData.COATS, wizardData.EYES);

  // Setting up similiar wizards list
  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < allWizards.length; i++) {
    fragment.appendChild(renderWizard(allWizards[i]));
  }
  similarListElement.appendChild(fragment);

  // Player settings
  var playerCoat = window.dialog.querySelector('.wizard-coat');
  var playerEyes = window.dialog.querySelector('.wizard-eyes');
  var playerFireball = window.dialog.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(playerCoat, wizardData.COATS, fillElement);
  window.colorizeElement(playerEyes, wizardData.EYES, fillElement);
  window.colorizeElement(playerFireball, wizardData.FIREBALLS, changeElementBackground);

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

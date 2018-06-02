'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var allWizards = getWizzards(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);

function getWizzards(names, surnames, coatColors, eyesColors) {
  var Wizards = [];
  for (var i = 0; i < 4; i++) {
    Wizards[i] = {};
    var name = getRandomElement(names);
    var surname = getRandomElement(surnames);
    Wizards[i].name = getFullName(name, surname);
    Wizards[i].coatColor = getRandomElement(coatColors);
    Wizards[i].eyesColor = getRandomElement(eyesColors);
  }
  return Wizards;
}

function getFullName(name, surname) {
  var fullName = name + ' ' + surname;
  return fullName;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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

document.querySelector('.setup-similar').classList.remove('hidden');
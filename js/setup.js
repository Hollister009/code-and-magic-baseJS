'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

function getWizzards(names, surnames, coatColors, eyesColors) {
  var Wizzards = [];
  for (var i = 0; i < 4; i++) {
    Wizzards[i] = {};
    var name = getRandomElement(names);
    var surname = getRandomElement(surnames);
    Wizzards[i].name = getFullName(name, surname);
    Wizzards[i].coatColor = getRandomElement(coatColors);
    Wizzards[i].eyesColor = getRandomElement(eyesColors);
  }
  return Wizzards;
}

function getFullName(name, surname) {
  var fullName = name + ' ' + surname;
  return fullName;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

console.log(getWizzards(WIZZARD_NAMES, WIZZARD_SURNAMES, COAT_COLORS, EYES_COLORS));

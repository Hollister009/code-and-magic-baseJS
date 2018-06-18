'use strict';

(function () {

  // Setting used elements & variables
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var saveButton = setup.querySelector('.setup-submit');
  var setupUserName = setup.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.upload');
  var preview = setup.querySelector('.setup-user-pic');
  var fileChooser = setup.querySelector('.upload input[type=file]');
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  // Opening and closing of dialog window
  var onPopupEscPress = function (evt) {
    if (document.activeElement !== setupUserName) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setup.removeAttribute('style');
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  saveButton.addEventListener('click', function () {
    closePopup();
  });

  // Update user avatar
  var uploadImage;

  var handleFile = function (file) {
    var fileEnd = file.name.toLowerCase();
    fileEnd = fileEnd.split(/\./);
    fileEnd = fileEnd[fileEnd.length - 1];

    var matches = FILE_TYPES.some(function (it) {
      return fileEnd === it;
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      }, false);

      reader.readAsDataURL(file);
    }
  };

  var onFileDrop = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    uploadImage = evt.dataTransfer.files[0];
    if (uploadImage) {
      handleFile(uploadImage);
    }
    // console.log('File(s) dropped', uploadImage);
  };

  var onFileSelect = function (evt) {
    evt.preventDefault();
    uploadImage = evt.target.files[0];
    if (uploadImage) {
      handleFile(uploadImage);
    }
    // console.log('File(s) dropped', uploadImage);
  };

  fileChooser.addEventListener('drop', onFileDrop);
  fileChooser.addEventListener('change', onFileSelect);

  // Dialog window move
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      dragged = true;
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (eCl) {
          eCl.preventDefault();
          dragged = false;
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dialog = document.querySelector('.setup');
})();

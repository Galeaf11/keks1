"use strict";

let uploadImg = document.querySelector('#upload-file');
let uploadImgClose = document.querySelector('#upload-cancel');
let overlay_upload = document.querySelector('.img-upload__overlay');
let effectNone = document.querySelector('#effect-none');

uploadImg.addEventListener('click', function (e) {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    effectNone.click();
});

uploadImgClose.addEventListener('click', function (e) {
    UploadClose();
});

//закрываем по нажатию на оверлей
overlay_upload.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('img-upload__overlay')) {
      UploadClose();
    }
});

let UploadClose = function (e) {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
};
//проверка поля на хештег

let uplForm = document.querySelector('.img-upload__form');
let hashtag = document.querySelector('.text__hashtags');

uplForm.addEventListener('submit', function (e) {
    if (!getValid()) {
        hashtag.setCustomValidity('Хештеги должны начинаться со знака # и должны разделяться пробелом');
        e.preventDefault();
        hashtag.style.border = '3px solid red';
    } else {
        console.log(отправлено)
    }
});

hashtag.addEventListener('input', function (e) {
    hashtag.style.border = '1px solid silver';
    hashtag.setCustomValidity('');
});

let getValid = function () {
  let strForSplit = hashtag.value;
  let arrAfterSplit = strForSplit.split(' ');

    for (let i = 0; i < arrAfterSplit.length; i++) {
        if (arrAfterSplit[i].charAt(0) !== '#') {
            return false;
        }
    }
    return true;
};
// контроль размеров изображения

let setScaleBigger = document.querySelector('.scale__control--bigger');
let setScaleSmaller = document.querySelector('.scale__control--smaller');
let scaleVal = document.querySelector('.scale__control--value');
scaleVal.value = 100 + '%'; // значение по умолчанию 100%

setScaleBigger.addEventListener('click', function (evt) {
    scaleVal.value = parseInt(scaleVal.value, 10) + 25 + '%';
    if (parseInt(scaleVal.value, 10) >= 100) {
      scaleVal.value = 100 + '%'
    }
    scaleTransform();
});

setScaleSmaller.addEventListener('click', function (evt) {
  scaleVal.value = parseInt(scaleVal.value, 10) - 25 + '%';
  if (parseInt(scaleVal.value, 10) <= 25) {
    scaleVal.value = 25 + '%'
  }
  scaleTransform();
});

let pictureUpload = document.querySelector('.img-upload__preview');

let scaleTransform = function () {
    pictureUpload.style.transform = 'scale(' + parseInt(scaleVal.value) / 100 + ')'
};
//убираем шкалу без эффекта(Оригинал выбран)

let radio = document.querySelectorAll('.effects__radio');
let level = document.querySelector('.img-upload__effect-level');
let pin = document.querySelector('.effect-level__pin');

let hideLevel = function () {
  level.classList.add('hidden');
};
let showLevel = function () {
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
};

hideLevel();

for (let i = 0; i < radio.length; i++) {
    radio[i].addEventListener('change', function (evt) {
        if (evt.target.id == 'effect-none') {
          hideLevel();
          pictureUpload.style.filter = 'none'
        }
        else {
          showLevel();
          window.getEffect = evt.target.id;
          pin.style.left = 453 + 'px';   //при старте линия и пин = 100%
          levelDepth.style.width = pin.style.left;   //при старте линия и пин = 100%
          setFilters(window.getEffect);
        }
    })
}
// заставляем пин двигаться по оси Х

let line = document.querySelector('.effect-level__line');
let levelDepth = document.querySelector('.effect-level__depth')

pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoordX = evt.clientX;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shiftX = startCoordX - moveEvt.clientX;

      startCoordX = moveEvt.clientX;

      pin.style.left = (pin.offsetLeft - shiftX) + 'px';

      //ограничиваем края пина
      //ограничиваем правый край
      if (parseInt(pin.style.left) >= line.clientWidth) {
          pin.style.left = line.clientWidth + 'px';
      }
      // ограничиваем правый край
      if (parseInt(pin.style.left) <= 0) {
          pin.style.left = 0 + 'px'
      }
      // привязываем линию заполняемости к пину
      levelDepth.style.width = pin.style.left;

      setFilters(window.getEffect)
    };

    let onMouseUp = function (evt) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove',onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

let setFilters = function (getEffect) {
    let percent = pin.offsetLeft / 4.53;
    switch (getEffect) {
      case 'effect-chrome':
          pictureUpload.style.filter = 'grayscale(' + percent / 100 + ')';
          break;
      case 'effect-sepia':
          pictureUpload.style.filter = 'sepia(' + percent / 100 + ')';
          break;
      case 'effect-marvin':
          pictureUpload.style.filter = 'invert(' + percent + '%)';
        break;
      case 'effect-phobos':
          pictureUpload.style.filter = 'blur(' + percent / 33.3 + 'px)';
        break;
      case 'effect-heat':
          pictureUpload.style.filter = 'brightness(' + percent / 33.3 + ')';
        break;
    }
};


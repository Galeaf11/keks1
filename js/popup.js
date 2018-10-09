"use strict";

// открываем попап при открытии страницы, добавляем слушателей, для закрытия попапа
let popup = document.querySelector('.big-picture');
let popupClose = document.querySelector('.big-picture__cancel');
let overlay = document.querySelector('.big-picture');
let aForPopup = document.querySelectorAll('.picture');
let aForPopup2 = document.querySelector('.picture');
let socialComments = document.querySelectorAll('.social__comment');

let onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
};

let openPopup = function () {
    popup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
};

let closePopup = function() {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
};

popupClose.addEventListener('click', closePopup);

overlay.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('big-picture')) {
      closePopup();
    }
});



let getRender = function () {
  alert(1);
  for (let i = 0; i < aForPopup.length; i++) {
    aForPopup[i].addEventListener('click', function (evt) {
      openPopup();
      // меняем изображение на отображение из первого элемента
      document.querySelector('.big-picture__img').children[0].src = this.children[0].src;

      // меняем количество лайков и комментов и описание
      document.querySelector('.likes-count').textContent = this.querySelector('.picture__likes').textContent;
      document.querySelector('.comments-count').textContent = this.querySelector('.picture__comments').textContent;
      document.querySelector('.social__caption').textContent = this.querySelector('.picture__description').textContent;

//рендерим комменты
      for(let i = 0; i < socialComments.length; i++) {
        socialComments[i].children[0].src = "img/avatar-" + getRandom(6, 1) + ".svg";
        socialComments[i].querySelector('.social__text').textContent = this.comments123[i];
      }
    });
  }
};
setTimeout(getRender, 2000);

// прячем лишние кнопки
document.querySelector('.social__comments-loader').classList.add('visually-hidden');



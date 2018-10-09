"use strict";



//генерируем объекты

let pictures = [];
let picturesFromServer = [];
let commentsArr = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
let descriptionArr = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
];

let getRandom = function (a, b) {
    return Math.floor(Math.random() * a + b);
};

let getComment = function () {
    let randomNum = getRandom(20, 5) ;
    let a = [];

    for (let i = 0; i <= randomNum; i++) {
      a.push(commentsArr[getRandom(commentsArr.length, 0)]);
    }
    return a;
};

for (let i = 1; i < 26; i++) {

    let generateObj = {
        url: 'photos/' + i + '.jpg',
        likes: getRandom(185, 15),
        comments: getComment(),
        description: descriptionArr[getRandom(descriptionArr.length, 0)]
    };

    pictures.push(generateObj);
}

let xhr = new XMLHttpRequest();
xhr.responseType = 'json';

xhr.addEventListener('readystatechange', function (evt) {
  if (this.readyState == 4 && this.status == 200) {
    let afterParse = xhr.response;
    getPictures(afterParse);
  }
});

xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
xhr.send();

let getPictures = function (pictureData) {
  let template = document.querySelector('#picture').content.querySelector('a');

  for (let i = 0; i < pictureData.length; i++) {
    let element = template.cloneNode(true);

    element.comments123 = pictureData[i].comments;
    element.children[0].src = pictureData[i].url;
    element.querySelector('.picture__likes').textContent = pictureData[i].likes;
    element.querySelector('.picture__comments').textContent = pictureData[i].comments.length;
    element.querySelector('.picture__description').textContent = pictures[i].description;
    document.querySelector('.pictures').appendChild(element);
  }
};



'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var NAMES = [
  'Толян', 'Клара Захаровна', 'дядя Вася', 'учитель географии', 'Инна', 'Матильда', 'Константин', 'Киска',
  'Валера', 'Сергей Геннадьевич', 'Майя Вячеславовна', 'Петруха', 'Равшан', 'Бородач', 'Лысый', 'Семён', 'Игорь',
  'Кирилл', 'Алла', 'Скрудж МакДак', 'Джонни', 'Люси', 'Алёна', 'Викуся', 'Рыжий', 'Антоха'
];

// Возвращает случайное целое число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var createArray = function (words, descriptions, names) {
  var arr = [];
  for (var i = 0; i < 25; i++) {
    var obj = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 201),
      comments: {
        avatar: 'img/avatar-' + getRandomInt(1, 7) + '.svg',
        message: descriptions[getRandomInt(0, descriptions.length)],
        name: names[getRandomInt(0, names.length)]
      }
    };
    arr.push(obj);
  }
  return arr;
};

var arrayOfObjects = createArray(COMMENTS, DESCRIPTIONS, NAMES);

// шаблон, который будем копировать
var template = document.querySelector('#picture').content.querySelector('a');

var createPhoto = function (someArrayOfObjects) {
  var photo = template.cloneNode(true);
  photo.querySelector('img').src = someArrayOfObjects.url;
  photo.querySelector('.picture__likes').textContent = someArrayOfObjects.likes;
  photo.querySelector('.picture__comments').textContent = 1;
  return photo;
};
// сюда вставляем элементы
var photoContainer = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var j = 0; j < 25; j++) {
  fragment.appendChild(createPhoto(arrayOfObjects[j]));
}
photoContainer.appendChild(fragment);


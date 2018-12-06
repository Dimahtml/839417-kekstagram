'use strict';

var QUANTITY_PHOTOS = 25;
var QUANTITY_AVATARS = 6;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var EFFECTS = ['effects__preview--none', 'effects__preview--chrome',
              'effects__preview--sepia', 'effects__preview--marvin',
              'effects__preview--phobos', 'effects__preview--heat'];
// var DESCRIPTIONS = [
//   'Тестим новую камеру!',
//   'Затусили с друзьями на море',
//   'Как же круто тут кормят',
//   'Отдыхаем...',
//   'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
//   'Вот это тачка!'
// ];

var NAMES = [
  'Толян', 'Клара Захаровна', 'дядя Вася', 'учитель географии', 'Инна', 'Матильда', 'Константин', 'Киска',
  'Валера', 'Сергей Геннадьевич', 'Майя Вячеславовна', 'Петруха', 'Равшан', 'Бородач', 'Лысый', 'Семён', 'Игорь',
  'Кирилл', 'Алла', 'Скрудж МакДак', 'Джонни', 'Люси', 'Алёна', 'Викуся', 'Рыжий', 'Антоха'
];

// Возвращает случайное целое число между min (включительно) и max (не включая max)
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// функция генерации случайных данных
var generateData = function (comments, names, quantityPhotos) {
  var arr = [];
  for (var i = 0; i < quantityPhotos; i++) {
    var obj = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 201),
      comments: {
        avatar: 'img/avatar-' + getRandomInt(1, (QUANTITY_AVATARS + 1)) + '.svg',
        message: comments[getRandomInt(0, comments.length)],
        name: names[getRandomInt(0, names.length)]
      }
    };
    arr.push(obj);
  }
  return arr;
};

// массив с данными
var arrayOfObjects = generateData(COMMENTS, NAMES, QUANTITY_PHOTOS);
// шаблон, который будем копировать
var template = document.querySelector('#picture').content.querySelector('a');
// сюда вставляем элементы
var photoContainer = document.querySelector('.pictures');

// функция создания DOM-элемента на основе JS-объекта
var createPhoto = function (someArrayOfObjects) {
  var photo = template.cloneNode(true);
  photo.querySelector('img').src = someArrayOfObjects.url;
  photo.querySelector('.picture__likes').textContent = someArrayOfObjects.likes;
  photo.querySelector('.picture__comments').textContent = 1;
  return photo;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var fillThePage = function (someArrayOfObjects, quantityPhotos) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < quantityPhotos; j++) {
    fragment.appendChild(createPhoto(someArrayOfObjects[j]));
  }
  photoContainer.appendChild(fragment);
};

fillThePage(arrayOfObjects, QUANTITY_PHOTOS);

// показываем и заполненяем данными большую фотографию
var showBigPicture = function (index) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  // console.log(bigPicture.querySelector('img').src);
  bigPicture.querySelector('img').src = arrayOfObjects[index].url;
  // bigPicture.querySelector('.likes-count').textContent = 'arrayOfObjects[index].likes';
  // bigPicture.querySelector('.comments-count').textContent = 1;
  // bigPicture.querySelector('.social__comments').innerHTML =
  //   '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getRandomInt(1, 7) +
  //   '.svg"alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' +
  //   arrayOfObjects[0].comments.message + '</p></li>';
  // bigPicture.querySelector('.social__caption').textContent = 'arrayOfObjects[index].descriptions';
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
  // находим кнопку закрытия окна (крестик) и добавляем ему обработчик событий
  var pictureCancel = document.querySelector('#picture-cancel');
  pictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
};

// showBigPicture(0);

// Форма редактирования изображения
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
// Кнопка ЗАГРУЗИТЬ
var uploadFile = document.querySelector('#upload-file');
// показываем форму редактирования загружаемого изображения и запускаем обработчик для закрытия формы
uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  // Кнопка для закрытия формы редактирования изображения
  var uploadCancel = document.querySelector('#upload-cancel');
  uploadCancel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
  });
});

// коллекция из маленьких фотографий на странице
var miniPictures = document.querySelectorAll('.picture__img');
// добавляем обработчик, который показывает большую фотку определенного номера(индекса)
var addclickHandler = function (miniPicture, miniPictureIndex) {
  miniPicture.addEventListener('click', function () {
    showBigPicture(miniPictureIndex);
  })
};
// навешиваем обработчик на каждую из маленьких фоток
for (var l = 0; l < miniPictures.length; l++) {
  addclickHandler(miniPictures[l], l);
};

// слайдер регулировки эффекта фотографии
var slider = document.querySelector('.effect-level__pin');
slider.addEventListener('mouseup', function () {

});

// КОЛЛЕКЦИЯ кнопок смены эффектов (фильтров)
var effects = document.querySelectorAll('.effects__radio');

// фото "предварительный просмотр изображения"
var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

// добавляем обработчик, который пишет прописывает класс "cls" элементу imageUploadPreview
var addClickHandlerEffect = function (image, cls) {
  image.addEventListener('click', function () {
    imgUploadPreview.setAttribute('class', cls);
    console.log(imgUploadPreview.classList);
  });
};

// навешиваем обработчик на каждую из кнопок с эффектами
for (var q = 0; q < effects.length; q++) {
  addClickHandlerEffect(effects[q], EFFECTS[q]);
}


console.log(imgUploadPreview.classList);

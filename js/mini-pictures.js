'use strict';
// этот модуль загружает на главную страницу коллекцию мини-фотографий и
// вешает на каждую из них обработчик показа полноразмерной фотографии и
// показывает полноразмерную фотографию с описанием, комментариями и лайками

(function () {

  var onLoad = function (arrayOfObjects) {

    console.log(arrayOfObjects[0].comments[1].avatar);

    // шаблон, который будем копировать
    var template = document.querySelector('#picture').content.querySelector('a');
    // сюда вставляем элементы
    var photoContainer = document.querySelector('.pictures');

    // функция создания DOM-элемента на основе JS-объекта
    var createPhoto = function (someArrayOfObjects) {
      var photo = template.cloneNode(true);
      photo.querySelector('img').src = someArrayOfObjects.url;
      photo.querySelector('.picture__likes').textContent = someArrayOfObjects.likes;
      photo.querySelector('.picture__comments').textContent = someArrayOfObjects.comments;
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

    fillThePage(arrayOfObjects, window.constants.QUANTITY_PHOTOS);

    // коллекция из мини-фотографий на странице
    var miniPictures = document.querySelectorAll('.picture__img');

    // показываем и заполняем данными большую фотографию
    var showBigPicture = function (index) {

      var bigPicture = document.querySelector('.big-picture');
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('img').src = arrayOfObjects[index].url;
      bigPicture.querySelector('.likes-count').textContent = arrayOfObjects[index].likes;
      bigPicture.querySelector('.comments-count').textContent = arrayOfObjects[index].comments.length;
      // bigPicture.querySelector('.social__comments').innerHTML =
      //    '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getRandomInt(1, 7) +
      //    '.svg"alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' +
      //    arrayOfObjects[0].comments.message + '</p></li>';

bigPicture.querySelector('.social__comments').innerHTML = '';

for (var ind = 0; ind < arrayOfObjects[index].comments.length; ind++) {
  bigPicture.querySelector('.social__comments').innerHTML +=
  '<li class="social__comment"><img class="social__picture" src='
   + arrayOfObjects[index].comments[ind].avatar
   + ' alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
   + arrayOfObjects[index].comments[ind].message
   + '</p></li>'
 }
       // аватар
      // bigPicture.querySelector('social__picture').src = arrayOfObjects[1].comments[1].avatar;
      // bigPicture.querySelector('.social__caption').textContent = 'arrayOfObjects[index].descriptions';
      document.querySelector('.social__comment-count').classList.add('visually-hidden');
      document.querySelector('.comments-loader').classList.add('visually-hidden');

      // находим кнопку закрытия окна (крестик) и добавляем ему обработчик событий
      var pictureCancel = document.querySelector('#picture-cancel');
      pictureCancel.addEventListener('click', function () {
        bigPicture.classList.add('hidden');
      });

    };

    // добавляем обработчик на мини-фотографию, который показывает ее в полном размере
    var addclickHandler = function (miniPicture, miniPictureIndex) {
      miniPicture.addEventListener('click', function () {
        showBigPicture(miniPictureIndex);
      });
    };

    // навешиваем обработчик на каждую из маленьких фоток на главной странице
    for (var i = 0; i < miniPictures.length; i++) {
      addclickHandler(miniPictures[i], i);
    }

  };

  window.load (onLoad);



})();

'use strict';
// этот модуль загружает на главную страницу коллекцию мини-фотографий (или выводит сообщение об ошибке в консоль)
// вешает на каждую из мини-фотографий обработчик показа полноразмерной фотографии и
// показывает (закрывает) полноразмерную фотографию с описанием, комментариями и лайками и
// принимает данные с сервера

(function () {

  // функция загружает данные с сервера вставляет на страницу мини-фотографии
  var downLoadSuccess = function (arrayOfObjects) {

    // шаблон, который будем копировать
    var template = document.querySelector('#picture').content.querySelector('a');
    // сюда вставляем элементы
    var photoContainer = document.querySelector('.pictures');

    // функция создания DOM-элемента на основе JS-объекта
    var createPhoto = function (someArrayOfObjects) {
      var photo = template.cloneNode(true);
      photo.querySelector('img').src = someArrayOfObjects.url;
      photo.querySelector('.picture__likes').textContent = someArrayOfObjects.likes;
      photo.querySelector('.picture__comments').textContent = someArrayOfObjects.comments.length;
      return photo;
    };

    // функция заполнения блока DOM-элементами на основе массива JS-объектов
    window.fillThePage = function (someArrayOfObjects, quantityPhotos) {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < quantityPhotos; j++) {
        fragment.appendChild(createPhoto(someArrayOfObjects[j]));
      }
      photoContainer.appendChild(fragment);
    };

    window.fillThePage(arrayOfObjects, window.constants.QUANTITY_PHOTOS);

    // коллекция из мини-фотографий на странице
    window.miniPictures = document.querySelectorAll('.picture__img');

    // показываем, заполняем данными и закрываем большую фотографию
    var showBigPicture = function (index) {

      document.querySelector('body').classList.add('modal-open');

      var bigPicture = document.querySelector('.big-picture');
      bigPicture.classList.remove('hidden');
      // адрес картинки
      bigPicture.querySelector('img').src = arrayOfObjects[index].url;
      // кол-во лайков
      bigPicture.querySelector('.likes-count').textContent = arrayOfObjects[index].likes;
      // кол-во комментариев
      bigPicture.querySelector('.comments-count').textContent = arrayOfObjects[index].comments.length;
      // Описание фотографии
      bigPicture.querySelector('.social__caption').textContent = arrayOfObjects[index].description;
      // комментарии обнуляем перед открытием фото
      bigPicture.querySelector('.social__comments').innerHTML = '';
      // добавляем аватары и комментарии
      // for (var k = 0; k < arrayOfObjects[index].comments.length; k++) {
      for (var k = 0; (k < 5) && (k < arrayOfObjects[index].comments.length); k++) {
        bigPicture.querySelector('.social__comments').innerHTML +=
        '<li class="social__comment"><img class="social__picture" src='
         + arrayOfObjects[index].comments[k].avatar
         + ' alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
         + arrayOfObjects[index].comments[k].message
         + '</p></li>';
      }

      // кнопка "загрузить еще комменты"
      // document.querySelector('.comments-loader').classList.add('hidden');

      // находим кнопку закрытия окна (крестик) и добавляем ему обработчик событий
      var pictureCancel = document.querySelector('#picture-cancel');
      pictureCancel.addEventListener('click', function () {
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
      });

      // закрываем окно
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          bigPicture.classList.add('hidden');
          document.querySelector('body').classList.remove('modal-open');
        }
      });

    };

    // добавляем обработчик на мини-фотографию, который показывает ее в полном размере
    window.addclickHandler = function (miniPicture, miniPictureIndex) {
      miniPicture.addEventListener('click', function () {
        showBigPicture(miniPictureIndex);
      });
    };

    // навешиваем обработчик на каждую из маленьких фоток на главной странице
    window.addHandlerToAllPictures = function () {
      window.miniPictures = document.querySelectorAll('.picture__img');
      for (var i = 0; i < window.miniPictures.length; i++) {
        var str = window.miniPictures[i].src.slice(-6); // индекс фото берем из его адреса
        str = str.slice(0, -4);
        if (str > 9) {
          parseInt(str, 10);
        } else {
          str = str.slice(-1);
        }
        parseInt(str, 10);
        window.addclickHandler(window.miniPictures[i], str - 1);
      }
    };

    window.addHandlerToAllPictures();

    window.arrayOfObjects = arrayOfObjects;

  };

  window.load(downLoadSuccess);

})();

'use strict';
// этот модуль загружает на главную страницу коллекцию мини-фотографий (или выводит сообщение об ошибке в консоль)
// вешает на каждую из мини-фотографий обработчик показа полноразмерной фотографии и
// показывает (закрывает) полноразмерную фотографию с описанием, комментариями и лайками и
// принимает данные с сервера

(function () {
  var QUANTITY_PHOTOS = 25;
  var QUANTITY_COMMENTS = 5;
  var ESC_KEYCODE = 27;
  var AVATAR_WIDTH = 25;
  var AVATAR_HEIGHT = 25;

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
      photo.querySelector('.picture__likes').textContent = someArrayOfObjects.likes.toString();
      photo.querySelector('.picture__comments').textContent = someArrayOfObjects.comments.length.toString();
      return photo;
    };
    // функция заполнения блока DOM-элементами на основе массива JS-объектов
    var fillThePage = function (someArrayOfObjects, quantityPhotos) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < quantityPhotos; i++) {
        fragment.appendChild(createPhoto(someArrayOfObjects[i]));
      }
      photoContainer.appendChild(fragment);
      window.showSortingBlock();
    };
    fillThePage(arrayOfObjects, QUANTITY_PHOTOS);
    // коллекция из мини-фотографий на странице
    var miniPictures = document.querySelectorAll('.picture__img');

    var createComment = function (singlePhoto, commentIndex) {
      var newLi = document.createElement('li');
      newLi.classList.add('social__comment');

      var newImg = document.createElement('img');
      newImg.classList.add('social__picture');
      newImg.src = singlePhoto.comments[commentIndex].avatar;
      newImg.alt = 'Аватар комментатора фотографии';
      newImg.width = AVATAR_WIDTH;
      newImg.height = AVATAR_HEIGHT;
      newLi.appendChild(newImg);

      var newP = document.createElement('p');
      newP.textContent = singlePhoto.comments[commentIndex].message;
      newLi.appendChild(newP);

      return newLi;
    };

    // показываем, заполняем данными и закрываем большую фотографию
    var showBigPicture = function (index) {
      document.querySelector('body').classList.add('modal-open');
      var bigPicture = document.querySelector('.big-picture');
      bigPicture.classList.remove('hidden');
      // адрес картинки
      bigPicture.querySelector('img').src = arrayOfObjects[index].url;
      // кол-во лайков
      bigPicture.querySelector('.likes-count').textContent = arrayOfObjects[index].likes.toString();
      // кол-во комментариев
      bigPicture.querySelector('.comments-count').textContent = arrayOfObjects[index].comments.length.toString();
      // Описание фотографии
      bigPicture.querySelector('.social__caption').textContent = arrayOfObjects[index].description.toString();
      // комментарии обнуляем перед открытием фото
      bigPicture.querySelector('.social__comments').innerHTML = '';

      // добавляем аватары и комментарии
      var fragmentComment = document.createDocumentFragment();
      for (var i = 0; (i < QUANTITY_COMMENTS) && (i < arrayOfObjects[index].comments.length); i++) {
        fragmentComment.appendChild(createComment(arrayOfObjects[index], i));
      }
      document.querySelector('.social__comments').appendChild(fragmentComment);

      var pictureCancel = document.querySelector('#picture-cancel');
      pictureCancel.addEventListener('click', function () {
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
      });

      // закрываем окно
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          bigPicture.classList.add('hidden');
          document.querySelector('body').classList.remove('modal-open');
        }
      });
    };
    // добавляем обработчик на мини-фотографию, который показывает ее в полном размере
    var addClickHandler = function (miniPicture, miniPictureIndex) {
      miniPicture.addEventListener('click', function () {
        showBigPicture(miniPictureIndex);
      });
    };
    // навешиваем обработчик на каждую из маленьких фоток на главной странице
    var addHandlerToAllPictures = function () {
      miniPictures = document.querySelectorAll('.picture__img');
      for (var i = 0; i < miniPictures.length; i++) {
        var str = miniPictures[i].src.slice(-6); // индекс фото берем из его адреса
        str = str.slice(0, -4);
        if (str > 9) {
          parseInt(str, 10);
        } else {
          str = str.slice(-1);
        }
        parseInt(str, 10);
        addClickHandler(miniPictures[i], str - 1);
      }

    // };
    // window.addHandlerToAllPictures() = addHandlerToAllPictures;
    // window.arrayOfObjects = arrayOfObjects;
    // window.fillThePage = fillThePage;
    };

    addHandlerToAllPictures();

    window.miniPictures = {
      addHandlerToAllPictures: addHandlerToAllPictures,
      arrayOfObjects: arrayOfObjects,
      fillThePage: fillThePage
    };

  };
  window.backend.load(downLoadSuccess);
})();

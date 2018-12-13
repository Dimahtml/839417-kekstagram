'use strict';
// этот модуль вешает обработчик показа полноразмерной фотографии на каждую мини-фото и
// показывает полноразмерную фотографию с описанием, комментариями и лайками

(function () {

  // коллекция из мини-фотографий на странице
  var miniPictures = document.querySelectorAll('.picture__img');

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

  // показываем и заполняем данными большую фотографию
  var showBigPicture = function (index) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    // console.log(bigPicture.querySelector('img').src);
    bigPicture.querySelector('img').src = window.arrayOfObjects[index].url;
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

})();

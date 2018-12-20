'use strict';
(function () {
  var STATUS_OK = 200;
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';

  var getXhr = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
  };

  // прием данных с сервера
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    getXhr(xhr, onLoad, onError);
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  // отправка данных на сервер
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    getXhr(xhr, onLoad, onError);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  }
})();

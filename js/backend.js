'use strict';
(function () {
  // прием данных с сервера
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.timeout = 10000; // 10s
    xhr.open('GET', window.constants.URL_LOAD);
    xhr.send();
  };
  // отправка данных на сервер
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    xhr.open('POST', window.constants.URL_SAVE);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    save: save
  }
})();

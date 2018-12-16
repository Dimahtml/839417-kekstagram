'use strict';
(function () {

  window.load = function (onLoad) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      onLoad(xhr.response);

    });

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();

  };

})();

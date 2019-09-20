'use strict';

(function () {
	var URL = 'http://jsonplaceholder.typicode.com/photos';
	var CARDS_NUMBER = 20;
	var cardList = document.querySelector('.card-list')

	var generate = function(cardData) {
		var cardTemplate = document.querySelector('#card').content;
		var card = cardTemplate.querySelector('.card').cloneNode(true); 	
		card.querySelector('.img').src = cardData.url;
		card.querySelector('.img').alt = 'cardData.id';
		card.querySelector('.title').textContent = cardData.title;
		card.querySelector('.albumId').textContent = 'albumId: ' + cardData.albumId;
		return card;
	}
	
	var render = function(notes) {
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < CARDS_NUMBER; i++) {
			fragment.appendChild(generate(notes[i]));
		}
			cardList.appendChild(fragment);


	};

	var successHandler = function(notes) {
		var data = notes;
		console.log(data);
		render(data);
	};

	var errorHandler = function(errorMesage) {
		alert(errorMesage);
	};
	 
  	var load = function (onSuccess, onError) {
	    var xhr = new XMLHttpRequest();
	    xhr.responseType = 'json';
	    xhr.addEventListener('load', function () {
	      if (xhr.status === 200) {
	        onSuccess(xhr.response);
	      } else {
	        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
	      }
	    });
	    xhr.addEventListener('error', function () {
	      onError('Произошла ошибка соединения');
	    });
	    xhr.addEventListener('timeout', function () {
	      onError('Время ожидания истекло');
	    });
	    xhr.timeout = 10000;

	    xhr.open('GET', URL);
	    xhr.send();
 	 };
	
	load(successHandler, errorHandler);
}
());



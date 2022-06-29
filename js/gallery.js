import {loadPhotos} from './loader.js';
import {renderErrorPopup} from './error-popup.js';
import {showBigPhoto} from './big-photo.js';

// Выбираем элемент, вутрь которого будем прибавлять созданные фото
const picturesElement = document.querySelector('.pictures');
// Выбираем элемень из template, который будем копировать
const templateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    // Скопировали элемент
    const photoElement = templateElement.cloneNode(true);

    const imgElement = photoElement.querySelector('img');
    const likesElement = photoElement.querySelector('.picture__likes');
    const commentsElement = photoElement.querySelector('.picture__comments');

    // Присваиваем значения
    likesElement.textContent = photo.likes;
    imgElement.src = photo.url;
    commentsElement.textContent = photo.comments.length;

    // Добавляем обработчик на каждый элемент
    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPhoto(photo);
    });

    fragment.append(photoElement);
  });


  picturesElement.append(fragment);
};

loadPhotos(renderPhotos, renderErrorPopup);

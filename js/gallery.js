import {filterPhotos} from './filters.js';
import {showBigPhoto} from './big-photo.js';

const picturesElement = document.querySelector('.pictures');
const templateElement = document.querySelector('#picture').content.querySelector('.picture');

const clearPicturesList = () => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((element) => element.remove());
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  filterPhotos(photos).forEach((photo) => {
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

  // Очищаем список отрисованных изображений
  clearPicturesList();
  picturesElement.append(fragment);
};


export {renderPhotos};


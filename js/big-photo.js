import {isEscapeCode} from './utils.js';

const MIN_COMMENTS_COUNT = 5;
const bigPhotoElement = document.querySelector('.big-picture');
const cancelButtonElement = bigPhotoElement.querySelector('.big-picture__cancel');
const commentsListElement = document.querySelector('.social__comments');
const commentTemplateElement = commentsListElement.children[0];
const imgElement = bigPhotoElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPhotoElement.querySelector('.social__caption');
const likesCountElement = bigPhotoElement.querySelector('.likes-count');
const loadMoreCommentsElement = document.querySelector('.social__comments-loader');
const currentCommentsCountElement = document.querySelector('.social__comment-count');


const showBigPhoto  = (photo) => {
  const allCommentsCount = photo.comments.length;
  let visibleCommentsCount = allCommentsCount >= MIN_COMMENTS_COUNT ? MIN_COMMENTS_COUNT : allCommentsCount;

  // функция рендера комментариев
  const renderComments = (comments, currentCount) => {
    currentCommentsCountElement.textContent = `${currentCount} из ${allCommentsCount} комметариев`;

    if (currentCount >= allCommentsCount ) {
      loadMoreCommentsElement.classList.add('hidden');
      loadMoreCommentsElement.removeEventListener('click', onLoadMoreButtonClick);
    }

    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      const commentElement = commentTemplateElement.cloneNode(true);
      const avatarElement = commentElement.querySelector('img');
      const commentTextElement = commentElement.querySelector('p');

      avatarElement.src = comment.avatar;
      avatarElement.alt = comment.name;
      commentTextElement.textContent = comment.message;

      fragment.append(commentElement);
    });


    commentsListElement.append(fragment);
  };

  // обработчик для загрузки комментариев
  function onLoadMoreButtonClick ()  {
    let nextCommentsCount = visibleCommentsCount + MIN_COMMENTS_COUNT;
    if(nextCommentsCount > allCommentsCount) {
      nextCommentsCount = allCommentsCount;
    }

    renderComments(photo.comments.slice(visibleCommentsCount, nextCommentsCount), nextCommentsCount);
    visibleCommentsCount = nextCommentsCount;
  }

  // Функция для открытия/закрытия по клику
  const onCancelButtonClick = () => {
    closePopup();
  };

  // Функция для открытия/закрытия по Esc
  const  onEscapeButtonClick = (evt) =>  {
    if (isEscapeCode(evt)) {
      closePopup();
    }
  };

  // Функция открытия модального окна
  const openPopup = () => {
    document.body.classList.add('modal-open');
    bigPhotoElement.classList.remove('hidden');
    // Добавляем обработчики
    cancelButtonElement.addEventListener('click', onCancelButtonClick);
    document.addEventListener('keydown', onEscapeButtonClick);
    loadMoreCommentsElement.addEventListener('click', onLoadMoreButtonClick);
  };

  // Функция закрытия модального окна
  function closePopup () {
    document.body.classList.remove('modal-open');
    bigPhotoElement.classList.add('hidden');
    loadMoreCommentsElement.classList.remove('hidden');
    // Убираем обработчики
    cancelButtonElement.removeEventListener('click', onCancelButtonClick);
    document.removeEventListener('keydown', onEscapeButtonClick);
    loadMoreCommentsElement.removeEventListener('click', onLoadMoreButtonClick);
  }

  // устанавливаем значения в разметку
  imgElement.src = photo.url;
  socialCaptionElement.textContent = photo.description;
  likesCountElement.textContent = photo.likes;
  commentsListElement.innerHTML='';
  // рендерим первые комментарии
  renderComments(photo.comments.slice(0, visibleCommentsCount), visibleCommentsCount);
  // открываем окно
  openPopup();
};

export {showBigPhoto};

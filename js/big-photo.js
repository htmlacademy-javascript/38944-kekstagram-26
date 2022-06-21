const bigPhotoElement = document.querySelector('.big-picture');
const cancelButtonElement = bigPhotoElement.querySelector('.big-picture__cancel');

const commentsListElement = document.querySelector('.social__comments');
const commentTemplateElement = commentsListElement.children[0];

const imgElement = bigPhotoElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPhotoElement.querySelector('.social__caption');
const likesCountElement = bigPhotoElement.querySelector('.likes-count');

const commentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');


//  TODO - будет реализованно в следущих уроках
commentCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');
commentsListElement.innerHTML='';

// Функция открытия модального окна
const openPopup = () => {
  document.body.classList.add('modal-open');
  bigPhotoElement.classList.remove('hidden');
  // Добавляем обработчики
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscapeButtonClick);
};

// Функция закрытия модального окна
const  closePopup = () => {
  document.body.classList.remove('modal-open');
  bigPhotoElement.classList.add('hidden');
  // Убираем обработчики
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onEscapeButtonClick);
};

// Функция для открытия/закрытия по клику
function onCancelButtonClick() {
  closePopup();
}

// Функция для открытия/закрытия по Esc
function onEscapeButtonClick(evt) {
  if (evt.code === 'Escape') {
    closePopup();
  }
}

// Функция рендера фотографии в модальном окне
const renderPhotoElement = (photo) => {
  const fragment = document.createDocumentFragment();

  imgElement.src = photo.url;
  socialCaptionElement.textContent = photo.description;
  likesCountElement.textContent = photo.likes;

  photo.comments.forEach((comment) => {
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

const showBigPhoto  = (photo) => {
  openPopup();
  renderPhotoElement(photo);
};

export {showBigPhoto};

import {isEscapeCode} from './utils.js';
const templateElement = document.querySelector('#error').content.querySelector('.error');

const renderUploadErrorPopup = () => {
  const errorPopupElement = templateElement.cloneNode(true);
  const errorButtonElement = errorPopupElement.querySelector('.error__button');

  errorPopupElement.style.zIndex = '10';

  document.body.append(errorPopupElement);

  const onEscapeButtonPress = (evt) => {
    if(isEscapeCode(evt)){
      closePopup();
    }
  };

  const onBackdropClick = (evt) => {
    if (evt.target.closest('.error__inner')) {
      return;
    }
    closePopup();
  };

  errorButtonElement.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', onEscapeButtonPress);

  document.addEventListener('click', onBackdropClick);

  function closePopup() {
    errorPopupElement.remove();
    document.removeEventListener('click', onBackdropClick);
    document.removeEventListener('keydown', onEscapeButtonPress);
  }
};


const renderErrorMessage = () => {
  const messageElement = document.createElement('div');
  messageElement.textContent = 'Произошёл технический сбой. Пожалуйста попробуйте позже.';
  messageElement.style.position = 'fixed';
  messageElement.style.height = '180px';
  messageElement.style.width = '430px';
  messageElement.style.top = '0';
  messageElement.style.right = '0';
  messageElement.style.backgroundColor = 'red';
  messageElement.style.fontSize = '16px';
  messageElement.style.fontWeight = 'bold';
  messageElement.style.textAlign = 'center';
  messageElement.style.lineHeight = '24px';
  messageElement.style.padding = '65px';
  document.body.append(messageElement);
  setTimeout (() => {messageElement.remove();}, 5000);
};


export {renderErrorMessage, renderUploadErrorPopup};

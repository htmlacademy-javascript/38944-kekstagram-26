import {isEscapeCode} from './utils.js';
const templateElement = document.querySelector('#error').content.querySelector('.error');

const renderUploadErrorPopup = () => {
  const errorPopupUpload = templateElement.cloneNode(true);
  const errorButtonElement = errorPopupUpload.querySelector('.error__button');

  errorPopupUpload.style.zIndex = '10';

  document.body.append(errorPopupUpload);

  const onEscapeButtonPress = (evt) => {
    if(isEscapeCode(evt)){
      closePopup();
    }
  };

  const onOutPopupClick = (evt) => {
    if (evt.target.closest('.error__inner')) {
      return;
    }
    closePopup();
  };

  errorButtonElement.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', onEscapeButtonPress);

  document.addEventListener('click', onOutPopupClick);

  function closePopup() {
    errorPopupUpload.remove();
    document.removeEventListener('click', onOutPopupClick);
    document.removeEventListener('keydown', onEscapeButtonPress);
  }
};


const renderErrorMessage = () => {
  const errorPopup = document.createElement('div');
  errorPopup.textContent = 'Произошёл технический сбой. Пожалуйста попробуйте позже.';
  errorPopup.style.position = 'fixed';
  errorPopup.style.height = '180px';
  errorPopup.style.width = '430px';
  errorPopup.style.top = '0';
  errorPopup.style.right = '0';
  // errorPopup.style.transform = 'translate(-50%, -50%)';
  errorPopup.style.backgroundColor = 'red';
  errorPopup.style.fontSize = '16px';
  errorPopup.style.fontWeight = 'bold';
  errorPopup.style.textAlign = 'center';
  errorPopup.style.lineHeight = '24px';
  errorPopup.style.padding = '65px';
  document.body.append(errorPopup);
  setTimeout (() => {errorPopup.remove();}, 5000);
};


export {renderErrorMessage, renderUploadErrorPopup};

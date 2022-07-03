import {isEscapeCode} from './utils.js';
const templateElement = document.querySelector ('#success').content.querySelector('.success');

const renderSuccessPopup = () => {
  const successPopupElement = templateElement.cloneNode(true);
  const successButtonElement = successPopupElement.querySelector('.success__button');

  document.body.append(successPopupElement);

  const onEscapeButtonPress = (evt) => {
    if(isEscapeCode(evt)){
      closePopup();
    }
  };

  const onBackdropClick = (evt) => {
    if (evt.target.closest('.success__inner')) {
      return;
    }
    closePopup();
  };

  successButtonElement.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', onEscapeButtonPress);

  document.addEventListener('click', onBackdropClick);

  function closePopup() {
    successPopupElement.remove();
    document.removeEventListener('click', onBackdropClick);
    document.removeEventListener('keydown', onEscapeButtonPress);
  }
};

export {renderSuccessPopup};

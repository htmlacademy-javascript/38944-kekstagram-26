import {isEscapeCode} from './utils.js';
const templateElement = document.querySelector ('#success').content.querySelector('.success');

const renderSuccessPopup = () => {
  const successPopup = templateElement.cloneNode(true);
  const successButtonElement = successPopup.querySelector('.success__button');

  document.body.append(successPopup);

  const onEscapeButtonPress = (evt) => {
    if(isEscapeCode(evt)){
      closePopup();
    }
  };

  const onOutPopupClick = (evt) => {
    if (evt.target.closest('.success__inner')) {
      return;
    }
    closePopup();
  };

  successButtonElement.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', onEscapeButtonPress);

  document.addEventListener('click', onOutPopupClick);

  function closePopup() {
    successPopup.remove();
    document.removeEventListener('click', onOutPopupClick);
    document.removeEventListener('keydown', onEscapeButtonPress);
  }
};

export {renderSuccessPopup};

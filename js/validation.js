import {isElementsUnique} from './utils.js';

const MAX_COUNT_HASHTAGS = 5;

const formElement = document.querySelector('#upload-select-image');
const hashtagsInput = formElement.querySelector('[name="hashtags"]');

const pristine =  new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagsInput, (value) => {
  // Приводим строку к одному регистру берем value, делим его на отдельные хэштеги - полумаем массив хэштегов
  // (хэш-теги разделяются пробелами)
  const hashtags = value.trim().toLowerCase().split(' ').filter((hashtag) => hashtag);
  const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  // Каждый элемент массива дожен проходить regExp.test()
  const isEveryHashtagValid = hashtags.every((item) => regExp.test(item));
  // Один и тот же хэш-тег не может быть использован дважды; - надо проверить массив на уникальность элементов
  const isHashtagsUnique = isElementsUnique(hashtags);
  // Нельзя указать больше пяти хэш-тегов; - надо проверить массив на длину
  return isEveryHashtagValid && isHashtagsUnique && hashtags.length <= MAX_COUNT_HASHTAGS;
}, 'Поле заполнено неверно');

const isUploadFormValid = () => pristine.validate();

const resetValidation = () => {
  pristine.reset();
};

export {isUploadFormValid, resetValidation};

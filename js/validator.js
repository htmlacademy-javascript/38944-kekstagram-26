import {isArrayUnique} from './utils.js';

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
  const isHashtagsUnique = isArrayUnique(hashtags);
  // Нельзя указать больше пяти хэш-тегов; - надо проверить массив на длину
  return isEveryHashtagValid && isHashtagsUnique && hashtags.length <= 5;
}, 'Поле заполнено неверно');

const isUploadFormValid = () => pristine.validate();
export {isUploadFormValid};

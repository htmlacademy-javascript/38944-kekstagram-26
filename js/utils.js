// eslint-disable-next-line no-unused-vars
const checkStringLength = (str, maxLength) => typeof maxLength === 'number' && typeof str === 'string' && str.trim().length <= maxLength;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Фунция принимает массив  и возвращает случайный элемент
const getRandomArrayElement = (items) => items[getRandomPositiveInteger(0, items.length - 1)];

const isArrayUnique = (elements) => {
  const result = [];

  elements.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });

  return result.length === elements.length;
};

const isEscapeCode = (evt) => evt.code === 'Escape';


export {getRandomPositiveInteger, getRandomArrayElement, isArrayUnique, isEscapeCode};

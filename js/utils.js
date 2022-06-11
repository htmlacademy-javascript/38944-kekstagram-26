// eslint-disable-next-line no-unused-vars
const checkStringLength = (str, maxLength) => typeof maxLength === 'number' && typeof str === 'string' && str.trim().length <= maxLength;

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Фунция принимает массив  и возвращает случайный элемент
const getRandomArrayElement = (items) => items[getRandomPositiveInteger(0, items.length - 1)];

export {getRandomPositiveInteger, getRandomArrayElement};

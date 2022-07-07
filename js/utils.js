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

// Перемешивание массива

const shuffle = (array) => {
  const shuffleArray = array.slice();
  let currentIndex = shuffleArray.length,  randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffleArray[currentIndex], shuffleArray[randomIndex]] = [
      shuffleArray[randomIndex], shuffleArray[currentIndex]];
  }

  return shuffleArray;
};

// сортировка методом пузырька по убыванию
const sortArray = (arr) => {
  const len = arr.length;

  for (let i = 0; i < len ; i++) {
    for(let j = 0 ; j < len - i - 1; j++){
      if (arr[j].likes > arr[j + 1].likes) {
        const temp = arr[j];
        arr[j] = arr[j+1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr.reverse();
};

const isEscapeCode = (evt) => evt.code === 'Escape';

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {getRandomPositiveInteger, getRandomArrayElement, isArrayUnique, isEscapeCode, debounce, shuffle, sortArray};

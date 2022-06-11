import {getRandomPositiveInteger, getRandomArrayElement} from './utils.js';

const PHOTO_QUANTITY = 25;

const TEXT_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHORS = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

const PHOTO_DESCRIPTIONS = [
  'Это нечто',
  'Что-то с чем-то',
  'Невероятный кадр',
  'Внезапно',
  'Как это так вышло?',
  'Смотрите! Смотрите!',
  'Ух ты!',
  'Картина маслом',
  'Вот это поворот',
  'Офигенный зум'
];

// Функция создания текста комментариев
const getCommentMessage = () => {
  const count = getRandomPositiveInteger(1,2);
  const messages = [];
  for (let i = 0; i < count; i++) {
    messages.push(getRandomArrayElement(TEXT_COMMENTS));
  }
  return  messages.join(' ');
};

// Функция создания комментария
const createComment = (value, index) => ({
  id: index + 1,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getCommentMessage(),
  name: getRandomArrayElement(AUTHORS)
});

// Создаем массив комметариев
const createCommentsList = () => Array.from({length: getRandomPositiveInteger(1, 5)}, createComment);

// Функция создания фото с комментариями
const createPhoto = (value, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: PHOTO_DESCRIPTIONS[getRandomPositiveInteger(1,PHOTO_DESCRIPTIONS.length -1)],
  likes: getRandomPositiveInteger(15, 200),
  comments: createCommentsList()
});


const createPhotoList = () => Array.from({ length: PHOTO_QUANTITY },  createPhoto);

export {createPhotoList};

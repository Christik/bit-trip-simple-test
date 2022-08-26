import dayjs from 'dayjs';

export const getRandomInteger = (from, to) => {
  if (to <= from) {
    throw new Error('Начальная точка диапазона должна быть меньше конечной точки диапазона');
  }

  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export const getRandomArrayElement = (elements) => {
  const maxIndex = elements.length - 1;
  const randomIndex = getRandomInteger(0, maxIndex);

  return elements[randomIndex];
};

export const createRandomizerOfUniqueInteger = (from, to) => {
  const repeatedNumbers = [];

  return () => {
    let randomNumber = getRandomInteger(from, to);

    while (repeatedNumbers.includes(randomNumber)) {
      randomNumber = getRandomInteger(from, to);
    }

    repeatedNumbers.push(randomNumber);

    return randomNumber;
  };
};

export const createCounter = () => {
  let count = 0;

  return () => ++count;
};

export const capitalizeFirstLetter = (text) => {
  const firstLetter = text[0].toUpperCase();
  const restText = text.slice(1);

  return `${firstLetter}${restText}`;
};

export const formatDate = (date, format) => dayjs(date).format(format);

export const isKeyEscape = (event) => (event.key === 'Escape' || event.key === 'Esc');

export const getIconUrl = (name) => `img/icons/${name}.png`;

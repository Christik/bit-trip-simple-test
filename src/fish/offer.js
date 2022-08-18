import { getRandomInteger, getRandomArrayElement } from '../utils.js';

const titles = [
  'Гендерный психоз',
  'Космомусор',
  'Понимающий лимб',
  'Основной закон психофизики',
  'Логарифм',
  'Весеннее зеленое обострение',
  'Гендерный двойной тренинг',
  'Гелиоцентрическое расстояние',
  'Сублимированный Юпитер',
  'Философский подражатель',
];

const generateOfferTitle = (titleList) => getRandomArrayElement(titleList);

const generateOfferPrice = () => {
  const randomNumber = getRandomInteger(1, 15);

  return randomNumber * 5;
};

const generateOffer = (id) => ({
  id,
  title: generateOfferTitle(titles),
  price: generateOfferPrice(),
});

export { generateOffer };

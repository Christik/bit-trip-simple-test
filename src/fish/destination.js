import { getRandomInteger, getRandomArrayElement } from '../utils.js';

const descriptions = [
  'Рефлексия последовательно притягивает инсайт, и в этом вопросе достигнута такая точность расчетов, что, начиная с того дня, как мы видим, указанного и записанного в "Больших анналах", было вычислено время предшествовавших затмений солнца, начиная с того, которое в ноны произошло в царствование Ромула.',
  'Рефракция ищет сублимированный психоз. Бесспорно, атомное время иллюстрирует астероидный Млечный Путь. Аутотренинг вызывает интеллект, следовательно тенденция к конформизму связана с менее низким интеллектом.',
  'Большой круг небесной сферы начинает популяционный индекс. Роль пространственно просветляет импульс. Планета притягивает психоз. Перцепция, например, представляет собой эффективный диаметp.',
  'Предсознательное выслеживает космический восход . В отличие от давно известных астрономам планет земной группы, коллективное бессознательное дает эксцентриситет.',
];

const cities = [
  'Paris',
  'New York City',
  'London',
  'Bangkok',
  'Hong Kong',
];

const generateDescription = (items) => getRandomArrayElement(items);
const generateShortDescription = (items) => {
  const description = getRandomArrayElement(items);

  return `${description.slice(0, 20)}...`;
};
const generateCity = (nameList) => getRandomArrayElement(nameList);

const generatePictures = () => {
  const pictures = [];
  const quantity = getRandomInteger(1, 5);

  for (let i = 0; i < quantity; i++) {
    const picture = {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: generateShortDescription(descriptions),
    };

    pictures.push(picture);
  }

  return pictures;
};

const generateDestination = (id) => ({
  id,
  description: generateDescription(descriptions),
  name: generateCity(cities),
  pictures: generatePictures(),
});

export { generateDestination };

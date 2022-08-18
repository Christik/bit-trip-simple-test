import { generateOffer } from './offer.js';
import { getRandomInteger } from '../utils';
import { POINT_TYPES } from '../const.js';

const generateOffersOfType = (quantity) => {
  const offers = [];

  for (let i = 0; i < quantity; i++) {
    offers.push(generateOffer(i + 1));
  }

  return offers;
};


const generateOfferGroups = () => {
  const groups = [];

  for (const type of POINT_TYPES) {
    const quantity = getRandomInteger(0, 5);
    const group = {
      type: type,
      offers: generateOffersOfType(quantity),
    };

    groups.push(group);
  }

  return groups;
};

const offerGroups = generateOfferGroups();
const getOfferGroups = () => offerGroups;

export { getOfferGroups };

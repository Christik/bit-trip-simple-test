import { generateOffer } from './offer.js';
import { getRandomInteger } from '../utils';
import Type from '../enum/type.js';

const generateOffersOfType = (quantity) => {
  const offers = [];

  for (let i = 0; i < quantity; i++) {
    offers.push(generateOffer(i + 1));
  }

  return offers;
};

const generateOfferGroups = () =>
  Object.values(Type).map((type) => ({
    type,
    offers: generateOffersOfType(getRandomInteger(0, 5)),
  }));

/**
 * @type {OfferGroup[]}
 */
const offerGroups = generateOfferGroups();
const getOfferGroups = () => offerGroups;

export { getOfferGroups };

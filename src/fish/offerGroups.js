import PointType from '../enum/point-type.js';
import { generateOffer } from './offer.js';
import { getRandomInteger } from '../utils';

const generateOffersOfType = (quantity) => {
  const offers = [];

  for (let i = 0; i < quantity; i++) {
    offers.push(generateOffer(i + 1));
  }

  return offers;
};

const generateOfferGroups = () => {
  const groups = [];

  for (const type of Object.values(PointType)) {
    const quantity = getRandomInteger(0, 5);
    const group = {
      type: type,
      offers: generateOffersOfType(quantity),
    };

    groups.push(group);
  }

  return groups;
};

/**
 * @type {OfferGroup[]}
 */
const offerGroups = generateOfferGroups();
const getOfferGroups = () => offerGroups;

export { getOfferGroups };

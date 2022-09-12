import PointType from '../enum/point-type.js';
import {
  getRandomInteger,
  getRandomArrayElement,
  createRandomizerOfUniqueInteger,
  createCounter } from '../utils.js';
import { getOfferGroups } from './offerGroups.js';
import { getDestinations } from './destinations.js';
import dayjs from 'dayjs';

const offerGroups = getOfferGroups();
const allDestinations = getDestinations();
const generatePointId = createCounter();

const getOffersByType = (type) => {
  const typeOffer = offerGroups.find((offerGroup) => (offerGroup.type === type));

  return typeOffer.offers;
};

const generateBasePrice = () => {
  const randomNumber = getRandomInteger(1, 30);

  return randomNumber * 100;
};

const generateDateFrom = () => {
  const maxMinutesGap = 5 * 24 * 60;
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);

  return dayjs().add(minutesGap, 'minute').format();
};

const generateDateTo = (dateFrom) => {
  const maxDaysGap = 3;
  const minutesGap = getRandomInteger(0, maxDaysGap * 24 * 60);

  return dayjs(dateFrom).add(minutesGap, 'minute').format();
};

const generateType = (types) => getRandomArrayElement(types);

const generatePointOffers = (type) => {
  const allOffers = getOffersByType(type);

  if (allOffers.length === 0) {
    return [];
  }

  const quantity = getRandomInteger(0, allOffers.length);

  if (quantity === 0) {
    return [];
  }

  if (allOffers.length === 1) {
    return [allOffers[0].id];
  }

  const offers = [];
  const getOfferIndex = createRandomizerOfUniqueInteger(0, allOffers.length - 1);

  for (let i = 0; i < quantity; i++) {
    const offerIndex = getOfferIndex();
    const offerId = allOffers[offerIndex].id;

    offers.push(offerId);
  }

  return offers;
};

const generateDestinationId = (destinations) => {
  if (destinations.length === 1) {
    return destinations[0].id;
  }

  const destination = getRandomArrayElement(destinations);

  return destination.id;
};

const generatePoint = () => {
  const type = generateType(Object.values(PointType));
  const offers = generatePointOffers(type);
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo(dateFrom);

  return {
    'base_price': generateBasePrice(),
    'date_from': dateFrom,
    'date_to': dateTo,
    'destination': generateDestinationId(allDestinations),
    'id': String(generatePointId()),
    'offers': offers,
    'type': type,
  };
};

export { generatePoint };

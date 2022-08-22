import { getRandomInteger, createCounter } from '../utils.js';
import { generateDestination } from './destination';

const getDestinationId = createCounter();

const generateDestinations = () => {
  const destinations = [];
  const quantity = getRandomInteger(1, 5);

  for (let i = 0; i < quantity; i++) {
    const id = getDestinationId();
    const destination = generateDestination(id);

    destinations.push(destination);
  }

  return destinations;
};

/**
 * @type {Destination[]}
 */
const allDestinations = generateDestinations();
const getDestinations = () => allDestinations;

export { getDestinations };

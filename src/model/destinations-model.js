import { getDestinations } from '../fish/destinations.js';

export default class DestinationsModel {
  get() {
    return getDestinations();
  }
}

import Model from './model.js';
import PointAdapter from '../adapter/point-adapter.js';
import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import { getDestinations } from '../fish/destinations';

/**
 * @template T
 * @param {T} target
 * @return {T}
 */
const clone = (target) => JSON.parse(JSON.stringify(target));

export default class RouteModel extends Model {
  /** @type {Point[]} */
  #points = null;

  /** @type {Destination[]} */
  #destinations = null;

  /** @type {OfferGroup[]} */
  #offerGroups = null;

  async ready() {
    if (this.#points) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.#points = Array.from({length: 20}, generatePoint);
    this.#destinations = getDestinations();
    this.#offerGroups = getOfferGroups();
  }

  getPoints() {
    return this.#points.map((point) => new PointAdapter(clone(point)));
  }

  /**
   * @param {number} id
   */
  getPointById(id) {
    return this.getPoints().find((item) => (item.id === id));
  }

  /**
   * @returns {OfferGroup[]}
   */
  getOfferGroups() {
    return clone(this.#offerGroups);
  }

  /**
   * @param {string} type
   * @returns {Offer[]}
   */
  getAvailableOffers(type) {
    const availableOffers = this.getOfferGroups()
      .find((offerGroup) => (offerGroup.type === type))
      .offers;

    return clone(availableOffers);
  }

  /**
   * @param {PointType} type
   * @param {number[]} ids
   * @returns {Offer[]}
   */
  getOffers(type, ids) {
    const offers = this
      .getAvailableOffers(type)
      .filter((item) => ids.includes(item.id));

    return clone(offers);
  }

  /**
   * @returns {Destination[]}
   */
  getDestinations() {
    return clone(this.#destinations);
  }

  /**
   * @param {number} id
   * @returns {Destination}
   */
  getDestinationById(id) {
    const destination = this.#destinations.find((item) => (item.id === id));

    return clone(destination);
  }

  /**
   * @param {string} name
   * @returns {Destination}
   */
  getDestinationByName(name) {
    const destination = this.#destinations.find((item) => (item.name === name));

    return clone(destination);
  }
}

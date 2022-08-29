import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import { getDestinations } from '../fish/destinations';
import PointAdapter from '../adapter/point-adapter.js';

/**
 * @template T
 * @param {T} target
 * @return {T}
 */
const clone = (target) => JSON.parse(JSON.stringify(target));

export default class RouteModel extends EventTarget {
  /**
   * @type {Point[]}
   */
  #points = null;

  /**
   * @type {Destination[]}
   */
  #destinations = null;

  /**
   * @type {OfferGroup[]}
   */
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
   * @param {string} id
   */
  getPointById(id) {
    return this.getPoints().find((item) => (item.id === id));
  }

  getOfferGroups() {
    return clone(this.#offerGroups);
  }

  /**
   * @param {PointType} type
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
   */
  getOffers(type, ids) {
    const offers = this
      .getAvailableOffers(type)
      .filter((item) => ids.includes(item.id));

    return clone(offers);
  }

  getDestinations() {
    return clone(this.#destinations);
  }

  /**
   * @param {number} id
   */
  getDestinationById(id) {
    const destination = this.#destinations.find((item) => (item.id === id));

    return clone(destination);
  }
}

import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import { getDestinations } from '../fish/destinations';
import PointAdapter from '../adapter/point-adapter.js';

/**
 * @template T
 * @param {T} target
 * @return {T}
 */
const clone = (target) =>
  JSON.parse(JSON.stringify(target));

export default class RouteModel {
  /** @type {Point[]} */
  #pointCache = Array.from({length: 20}, generatePoint);

  /** @type {Destination[]} */
  #destinationCache = getDestinations();

  /** @type {OfferGroup[]} */
  #offerCache = getOfferGroups();

  getPoints() {
    return this.#pointCache.map((point) => new PointAdapter(point));
  }

  /**
   * @param {string} id
   */
  getPointById(id) {
    const point = this.#pointCache.find((item) => (item.id === id));

    return new PointAdapter(point);
  }

  /**
   * Возвращает все группы оферов
   */
  get offerGroups() {
    return getOfferGroups();
  }

  /**
   * Возвращает массив со всеми оферами указанного типа
   * @param {PointType} type
   */
  getAvailableOffers(type) {
    return this.offerGroups.find((offerGroup) => offerGroup.type === type).offers;
  }

  /**
   * @param {PointType} type
   * @param {number[]} ids
   */
  getOffers(type, ids) {
    return this.getAvailableOffers(type).filter((item) => ids.includes(item.id));
  }

  getDestinations() {
    return clone(this.#destinationCache);
  }

  /**
   * @param {number} id
   */
  getDestinationById(id) {
    const destination = this.#destinationCache.find((item) => item.id === id);

    return clone(destination);
  }

  /**
   * Возвращает все пункты назначения
   */
  get destinations() {
    return getDestinations();
  }

  /**
   * Возвращает все точки маршрута
   */
  get points() {
    const points = Array.from({length: 20}, generatePoint);

    return points.map((point) => {
      /**
       * @type {AggregatedPoint}
       */
      const aggregatePoint = {
        basePrice: point['base_price'],
        dateFrom: point['date_from'],
        dateTo: point['date_to'],
        id: point.id,
        type: point.type,
        offers: this.offerGroups.find((group) => (group.type === point.type)).offers.slice(0, 2),
        destination: this.destinations.find((destination) => destination.id === point.destination),
      };

      return aggregatePoint;
    });
  }
}

import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import { getDestinations } from '../fish/destinations';
import PointAdapter from '../adapter/point-adapter.js';

// TODO: проверить, чтобы везде возвращались клонированные объекты
// Переделать геттеры в методы

/**
 * @template T
 * @param {T} target
 * @return {T}
 */
const clone = (target) => JSON.parse(JSON.stringify(target));

export default class RouteModel extends EventTarget {
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
    return this.#points.map((point) => new PointAdapter(point));
  }

  /** @param {string} id */
  getPointById(id) {
    const point = this.#points.find((item) => (item.id === id));

    return new PointAdapter(point);
  }

  get offerGroups() {
    return getOfferGroups();
  }

  /** @param {PointType} type */
  getAvailableOffers(type) {
    return this.offerGroups
      .find((offerGroup) => (offerGroup.type === type))
      .offers;
  }

  /**
   * @param {PointType} type
   * @param {number[]} ids
   */
  getOffers(type, ids) {
    return this
      .getAvailableOffers(type)
      .filter((item) => ids.includes(item.id));
  }

  get destinations() {
    return clone(this.#destinations);
  }

  /** @param {number} id */
  getDestinationById(id) {
    const destination = this.#destinations.find((item) => (item.id === id));

    return clone(destination);
  }

  async updatePoint(id, data) {
    /*
    1. Отправить данные в хранилище
    2. Сообщить, что точка маршрута обновлена
    */

    this.dispatchEvent(new CustomEvent('update-point', { detail: id }));
  }
}

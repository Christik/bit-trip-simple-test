import BaseView from './base-view.js';
import { createPointOfferTemplate } from './point-offer-template.js';

/**
 * Представление оффера в точке маршрута
 */
export default class PointOfferView extends BaseView {
  constructor() {
    super();
    this.classList.add('event__offer');
  }

  /**
   * @override
   */
  createTemplate() {
    return createPointOfferTemplate();
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   * @returns {PointOfferView}
   */
  setTitle(title) {
    const element = this.querySelector('.event__offer-title');

    element.textContent = title;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number | string} price
   * @returns {PointOfferView}
   */
  setPrice(price) {
    const element = this.querySelector('.event__offer-price');

    element.textContent = price;

    return this;
  }
}

customElements.define('trip-point-offer', PointOfferView);

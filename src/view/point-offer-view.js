import ComponentView from './component-view.js';
import { createPointOfferTemplate } from './templates/point-offer-template.js';

/**
 * Представление оффера в точке маршрута
 */
export default class PointOfferView extends ComponentView {
  constructor() {
    super();
    this.classList.add('event__offer');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return createPointOfferTemplate();
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   */
  setTitle(title) {
    const view = this.querySelector('.event__offer-title');

    view.textContent = title;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number} price
   */
  setPrice(price) {
    const view = this.querySelector('.event__offer-price');

    view.textContent = String(price);

    return this;
  }
}

customElements.define('trip-point-offer', PointOfferView);

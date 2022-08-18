import BaseView from './base-view.js';
import { createOfferSelectorTemplate } from './offer-selection-template.js';

export default class OfferSelectorView extends BaseView {
  constructor() {
    super();
    this.classList.add('event__offer-selector');
  }

  /**
   * @override
   */
  createTemplate() {
    return createOfferSelectorTemplate();
  }

  /**
   * Устанавливает значения для input[type=checkbox]
   * @param {number | string} id
   * @param {string} type
   * @param {boolean} isChecked
   * @return {OfferSelectorView}
   */
  setInput(id, type, isChecked) {
    const inputElement = this.querySelector('.event__offer-checkbox');
    const labelElement = this.querySelector('.event__offer-label');
    const uniqueName = `event-offer-${type}-${id}`;

    inputElement.id = uniqueName;
    inputElement.name = uniqueName;
    inputElement.checked = isChecked;
    labelElement.htmlFor = uniqueName;

    return this;
  }

  /**
   * Устанавливает название оффера
   * @param {string} title
   * @return {OfferSelectorView}
   */
  setTitle(title) {
    const element = this.querySelector('.event__offer-title');

    element.textContent = title;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number | string} price
   * @return {OfferSelectorView}
   */
  setPrice(price) {
    const element = this.querySelector('.event__offer-price');

    element.textContent = price;

    return this;
  }
}

customElements.define('trip-offer-selector', OfferSelectorView);

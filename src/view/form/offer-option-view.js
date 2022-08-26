import ComponentView, { html } from '../component-view.js';

export default class OfferOptionView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__offer-selector');
  }

  /**
   * @override
   * @param {number} id
   * @param {string} title
   * @param {number} price
   * @param {boolean} isChecked
   */
  createTemplate(id, title, price, isChecked) {
    return html`
      <input 
        class="event__offer-checkbox  visually-hidden" 
        id="event-offer-${id}" 
        type="checkbox" 
        name="event-offer-${id}"
        ${isChecked ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    `;
  }

  //TODO: убрать методы

  /**
   * Устанавливает значения для input[type=checkbox]
   * @param {number} id
   * @param {PointType} type
   * @param {boolean} isChecked
   */
  setInput(id, type, isChecked) {
    /**
     * @type {HTMLInputElement}
     */
    const inputView = this.querySelector('.event__offer-checkbox');
    /**
     * @type {HTMLLabelElement}
     */
    const labelView = this.querySelector('.event__offer-label');
    const uniqueName = `event-offer-${type}-${id}`;

    inputView.id = uniqueName;
    inputView.name = uniqueName;
    inputView.checked = isChecked;
    labelView.htmlFor = uniqueName;

    return this;
  }

  /**
   * Устанавливает название оффера
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

customElements.define(String(OfferOptionView), OfferOptionView);

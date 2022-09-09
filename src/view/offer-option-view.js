import ComponentView, {html} from './component-view.js';

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
   */
  createTemplate(id, title, price) {
    return html`
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${id}"
        type="checkbox"
        name="event-offer-${id}"
      >
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    `;
  }
}

customElements.define(String(OfferOptionView), OfferOptionView);

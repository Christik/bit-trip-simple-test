import './offer-select-view.css';

import View, {html} from './view.js';

export default class OfferSelectView extends View {
  constructor() {
    super(...arguments);

    this.classList.add('event__section', 'event__section--offers');

    this.offersView = this.querySelector('.event__available-offers');
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers"></div>
  `;
  }

  createOptionTemplate(id, title, price) {
    return html`
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}"
          type="checkbox"
          name="event-offer"
          value="${id}"
        >
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
    `;
  }

  getSelectedValues() {
    /** @type {NodeListOf<HTMLInputElement>} */
    const selectedInputViews = this.querySelectorAll(':checked');

    return [...selectedInputViews].map((view) => view.value);
  }

  /**
   * @param {[number, string, number][]} states
   */
  setOptions(states) {
    const templates = states.map((state) => this.createOptionTemplate(...state));

    this.offersView.innerHTML = templates.join('');

    return this;
  }

  /**
   * @param {boolean[]} flags
   */
  setOptionsChecked(flags) {
    const inputViews = this.querySelectorAll('input');

    flags.forEach((flag, index) => (inputViews[index].checked = flag));

    return this;
  }
}

customElements.define(String(OfferSelectView), OfferSelectView);

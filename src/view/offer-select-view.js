import ComponentView, {html} from './component-view.js';
import OfferOptionView from './offer-option-view';

export default class OfferSelectView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__section', 'event__section--offers');
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

  /**
   * @param {[number, string, number, boolean][]} states
   */
  setOptions(states) {
    const areOffersEmpty = (states.length === 0);
    const views = states.map((state) => new OfferOptionView(...state));

    if (areOffersEmpty) {
      this.hidden = true;

      return this;
    }

    this.hidden = false;
    this.querySelector('.event__available-offers').replaceChildren(...views);

    return this;
  }
}

customElements.define(String(OfferSelectView), OfferSelectView);

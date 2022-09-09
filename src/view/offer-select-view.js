import './offer-select-view.css';

import ComponentView, {html} from './component-view.js';
import OfferOptionView from './offer-option-view';

export default class OfferSelectView extends ComponentView {
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

  /**
   * @param {[number, string, number][]} states
   */
  setOptions(states) {
    const areOffersEmpty = (states.length === 0);
    const views = states.map((state) => new OfferOptionView(...state));

    if (areOffersEmpty) {
      this.hidden = true;

      return this;
    }

    this.hidden = false;
    this.offersView.replaceChildren(...views);

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

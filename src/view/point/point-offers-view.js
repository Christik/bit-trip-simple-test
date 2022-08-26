import ComponentView from '../component-view.js';
import PointOfferView from './point-offer-view.js';

export default class PointOffersView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__selected-offers');
  }

  /** @param {[string, number][]} states */
  setOptions(states) {
    const views = states.map((state) => new PointOfferView(...state));

    this.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(PointOffersView), PointOffersView);

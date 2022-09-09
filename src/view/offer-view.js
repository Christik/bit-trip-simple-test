/** @typedef {[title: string, price: number]} State */

import ComponentView, {html} from './component-view.js';

export default class OfferView extends ComponentView {
  /**
   * @param  {State} state
   */
  constructor(...state) {
    super(...state);

    this.classList.add('event__offer');
  }

  /**
   * @override
   * @param  {State} state
   */
  createTemplate(...state) {
    const [ title, price ] = state;

    return html`
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    `;
  }
}

customElements.define(String(OfferView), OfferView);

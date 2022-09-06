import RadioGroupView from './radio-group-view.js';
import SortOptionView from './sort-option-view.js';
import { html } from '../utils.js';

export default class SortSelectView extends RadioGroupView {
  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      </form>
    `;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new SortOptionView(...state));

    this.querySelector('form').replaceChildren(...views);

    return this;
  }
}

customElements.define(String(SortSelectView), SortSelectView);

import RadioGroupView from './radio-group-view.js';
import FilterOptionView from './filter-option-view.js';
import { html } from '../utils.js';

export default class FilterSelectView extends RadioGroupView {
  /**
   * @override
   */
  createTemplate() {
    return html`
    <form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new FilterOptionView(...state));

    this.querySelector('.trip-filters').prepend(...views);

    return this;
  }
}

customElements.define(String(FilterSelectView), FilterSelectView);

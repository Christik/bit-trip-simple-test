import ComponentView from './component-view.js';
import { html } from '../utils.js';

export default class SortOptionView extends ComponentView {
  constructor(label, value) {
    super(label, value);

    this.classList.add('trip-sort__item', `trip-sort__item--${value}`);
  }

  /**
   * @override
   */
  createTemplate(label, value) {
    return html`
      <input
        id="sort-${value}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="${value}"
      >
      <label class="trip-sort__btn" for="sort-${value}">
        ${label}
      </label>
    `;
  }
}

customElements.define(String(SortOptionView), SortOptionView);

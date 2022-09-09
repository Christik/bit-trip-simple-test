import ComponentView, {html} from './component-view.js';

export default class FilterOptionView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('trip-filters__filter');
  }

  /**
   * @override
   * @param {string} label
   * @param {string} value
   */
  createTemplate(label, value) {
    return html`
      <input
        id="filter-${value}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${value}"
      >
      <label
        class="trip-filters__filter-label"
        for="filter-${value}"
      >
        ${label}
      </label>
    `;
  }
}

customElements.define(String(FilterOptionView), FilterOptionView);

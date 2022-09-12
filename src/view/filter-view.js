import RadioGroupView, {html} from './radio-group-view.js';

export default class FilterView extends RadioGroupView {
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

  createOptionTemplate(label, value) {
    return html`
      <div class="trip-filters__filter">
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
      </div>
    `;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const templates = states.map((state) => this.createOptionTemplate(...state));

    this.querySelector('.trip-filters')
      .insertAdjacentHTML('afterbegin', templates.join(''));

    return this;
  }
}

customElements.define(String(FilterView), FilterView);

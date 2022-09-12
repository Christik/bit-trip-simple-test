import RadioGroupView, {html} from './radio-group-view.js';

export default class SortView extends RadioGroupView {
  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      </form>
    `;
  }

  createOptionTemplate(label, value) {
    return html`
      <div class="trip-sort__item trip-sort__item--${value}">
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
      </div>
    `;
  }


  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const templates = states.map((state) => this.createOptionTemplate(...state));

    this.querySelector('form').innerHTML = templates.join('');

    return this;
  }
}

customElements.define(String(SortView), SortView);

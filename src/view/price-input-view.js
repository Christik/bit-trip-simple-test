import View, {html} from './view.js';

export default class PriceInputView extends View {
  constructor() {
    super(...arguments);

    /**
     * @type {HTMLInputElement}
     */
    this.inputView = this.querySelector('.event__input--price');

    this.classList.add('event__field-group', 'event__field-group--price');
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input
        class="event__input  event__input--price"
        id="event-price-1"
        type="text"
        name="event-price"
        value=""
      >
    `;
  }

  getValue() {
    return this.inputView.value;
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    this.inputView.value = value;

    return this;
  }
}

customElements.define(String(PriceInputView), PriceInputView);

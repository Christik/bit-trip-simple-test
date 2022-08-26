import ComponentView, {html} from '../component-view.js';

export default class PriceInputView extends ComponentView {
  constructor() {
    super(...arguments);

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

  /** @param {number} value */
  setValue(value) {
    /** @type {HTMLInputElement} */
    const view = this.querySelector('.event__input--price');

    view.value = String(value);

    return this;
  }
}

customElements.define(String(PriceInputView), PriceInputView);

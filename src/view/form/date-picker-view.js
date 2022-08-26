import ComponentView, {html} from '../component-view.js';

export default class DatePickerView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--time');
  }

  /** @override */
  createTemplate() {
    return html`
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input 
        class="event__input  event__input--time" 
        id="event-start-time-1" 
        type="text" 
        name="event-start-time" 
        value=""
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input 
        class="event__input  event__input--time" 
        id="event-end-time-1" 
        type="text" 
        name="event-end-time" 
        value=""
      >
    `;
  }

  /** @param {string} value */
  setStartDate(value) {
    /** @type {HTMLInputElement} */
    const view = this.querySelector('[name="event-start-time"]');

    view.value = value;

    return this;
  }

  /** @param {string} value */
  setEndDate(value) {
    /** @type {HTMLInputElement} */
    const view = this.querySelector('[name="event-end-time"]');

    view.value = value;

    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);

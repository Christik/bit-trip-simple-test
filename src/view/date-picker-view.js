import 'flatpickr/dist/flatpickr.min.css';

import flatpickr from 'flatpickr';
import ComponentView from './component-view.js';
import { html } from '../utils.js';

const DATE_FORMAT = 'd/m/y H:i';

export default class DatePickerView extends ComponentView {
  #startInputSelector = '[name="event-start-time"]';
  #endInputSelector = '[name="event-end-time"]';

  #startFlatpickr = null;
  #endFlatpickr = null;

  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--time');

    this.#initFlatpickr();
  }

  /**
   * @override
   */
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

  #initFlatpickr() {
    const changeDate = (_, __, instance) => {
      const inputView = instance.element;
      const isStartInput = inputView.closest(this.#startInputSelector);

      if (isStartInput) {
        this.#updateStartDate();
        return;
      }

      this.#updateEndDate();
    };

    const options = {
      'dateFormat': DATE_FORMAT,
      'enableTime': true,
      'time_24hr': true,
      'onChange': changeDate,
    };

    this.#startFlatpickr = flatpickr(
      this.querySelector(this.#startInputSelector),
      options
    );

    this.#endFlatpickr = flatpickr(
      this.querySelector(this.#endInputSelector),
      options
    );
  }

  #updateStartDate() {
    const [date] = this.#startFlatpickr.selectedDates;
    this.#endFlatpickr.set('minDate', date);
  }

  #updateEndDate() {
    const [date] = this.#endFlatpickr.selectedDates;
    this.#startFlatpickr.set('maxDate', date);
  }

  /**
   * @param {string} value
   */
  setStartDate(value) {
    const date = new Date(value);

    this.#startFlatpickr.setDate(date);
    this.#updateStartDate();

    return this;
  }

  /**
   * @param {string} value
   */
  setEndDate(value) {
    const date = new Date(value);

    this.#endFlatpickr.setDate(date);
    this.#updateEndDate();

    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);

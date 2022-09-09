import 'flatpickr/dist/flatpickr.min.css';

import initCalendar from 'flatpickr';
import ComponentView, {html} from './component-view.js';

/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

const DATE_FORMAT = 'd/m/y H:i';

// TODO: вынести логику в презентер

export default class DatePickerView extends ComponentView {
  #startInputSelector = '[name="event-start-time"]';
  #endInputSelector = '[name="event-end-time"]';

  #startDateCalendar;
  #endDateCalendar;

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

    this.#startDateCalendar = initCalendar(
      this.querySelector(this.#startInputSelector),
      options
    );

    this.#endDateCalendar = initCalendar(
      this.querySelector(this.#endInputSelector),
      options
    );
  }

  #updateStartDate() {
    const [date] = this.#startDateCalendar.selectedDates;
    this.#endDateCalendar.set('minDate', date);
  }

  #updateEndDate() {
    const [date] = this.#endDateCalendar.selectedDates;
    this.#startDateCalendar.set('maxDate', date);
  }

  getStartDate() {
    return this.#startDateCalendar.selectedDates[0];
  }

  /**
   * @param {CalendarDate} value
   * @param {CalendarOptions} options
   */
  setStartDate(value, options = {}) {
    const date = new Date(value);

    this.#startDateCalendar.set(options);
    this.#startDateCalendar.setDate(date);

    return this;
  }

  getEndDate() {
    return this.#endDateCalendar.selectedDates[0];
  }

  /**
   * @param {string} value
   */
  setEndDate(value) {
    const date = new Date(value);

    this.#endDateCalendar.setDate(date);
    this.#updateEndDate();

    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);

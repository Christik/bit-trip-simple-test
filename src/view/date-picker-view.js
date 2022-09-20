import 'flatpickr/dist/flatpickr.min.css';

import initCalendar from 'flatpickr';
import View, {html} from './view.js';

export default class DatePickerView extends View {
  #startDateCalendar;
  #endDateCalendar;

  constructor() {
    super(...arguments);

    // TODO: перенести колбэки в презентер buildView()
    const onStartDateChange = (selectedDates) =>
      this.#endDateCalendar.set('minDate', selectedDates[0]);

    /**
     * @type {Calendar}
     */
    this.#startDateCalendar = initCalendar(
      this.querySelector('[name="event-start-time"]'),
    );

    /**
     * @type {Calendar}
     */
    this.#endDateCalendar = initCalendar(
      this.querySelector('[name="event-end-time"]')
    );

    this.#startDateCalendar.set('onChange', onStartDateChange);

    this.classList.add('event__field-group', 'event__field-group--time');
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

  getDates() {
    return [
      this.#startDateCalendar.selectedDates[0]?.toJSON(),
      this.#endDateCalendar.selectedDates[0]?.toJSON()
    ];
  }

  /**
   * @param {CalendarDate} startDate
   * @param {CalendarDate} endDate
   */
  setDates(startDate, endDate = startDate) {
    this.#startDateCalendar.setDate(new Date(startDate), true);
    this.#endDateCalendar.setDate(new Date(endDate), true);
  }

  static configure(options) {
    initCalendar.setDefaults(options);
  }
}

customElements.define(String(DatePickerView), DatePickerView);
